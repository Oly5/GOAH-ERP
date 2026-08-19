const Payment = require("../models/Payment");
const SalesOrder = require("../models/SalesOrder");

const createPayment = async (req, res) => {
    try {
        const {
            salesOrder,
            customer,
            amount,
            paymentMethod,
            reference,
            notes,
        } = req.body;

        // Find the sales order
        const order = await SalesOrder.findById(salesOrder);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Sales order not found",
            });
        }

        // Calculate previous payments
        const previousPayments = await Payment.find({
            salesOrder,
        });

        const totalPaid = previousPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const remaining = order.totalAmount - totalPaid;

        // Prevent overpayment
        if (amount > remaining) {
            return res.status(400).json({
                success: false,
                message: `Payment exceeds remaining balance of ${remaining} ETB`,
            });
        }

        // Create payment
        const payment = await Payment.create({
            salesOrder,
            customer,
            amount,
            paymentMethod,
            reference,
            notes,
        });

        // Calculate new balance
        const newTotalPaid = totalPaid + amount;

        if (newTotalPaid === order.totalAmount) {
            order.paymentStatus = "paid";
        } else {
            order.paymentStatus = "partial";
        }

        await order.save();

        res.status(201).json({
            success: true,
            data: payment,
            paymentSummary: {
                invoiceAmount: order.totalAmount,
                previousPaid: totalPaid,
                currentPayment: amount,
                totalPaid: newTotalPaid,
                remaining: order.totalAmount - newTotalPaid,
                status: order.paymentStatus,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("customer")
            .populate("salesOrder");

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createPayment,
    getPayments,
};