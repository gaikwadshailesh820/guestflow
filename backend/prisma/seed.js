const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    await prisma.activity.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.guest.deleteMany();
    await prisma.room.deleteMany();

    // =========================
    // ROOMS
    // =========================

    const room101 = await prisma.room.create({
        data: {
            roomNumber: "101",
            type: "STANDARD_SINGLE",
            floor: 1,
            capacity: 1,
            price: 2000,
            ac: true,
            status: "OCCUPIED",
        },
    });

    const room102 = await prisma.room.create({
        data: {
            roomNumber: "102",
            type: "STANDARD_SINGLE",
            floor: 1,
            capacity: 1,
            price: 2000,
            ac: true,
            status: "AVAILABLE",
        },
    });

    const room201 = await prisma.room.create({
        data: {
            roomNumber: "201",
            type: "DELUXE_DOUBLE",
            floor: 2,
            capacity: 2,
            price: 3500,
            ac: true,
            status: "AVAILABLE",
        },
    });

    const room202 = await prisma.room.create({
        data: {
            roomNumber: "202",
            type: "DELUXE_DOUBLE",
            floor: 2,
            capacity: 2,
            price: 3500,
            ac: true,
            status: "OCCUPIED",
        },
    });

    const room301 = await prisma.room.create({
        data: {
            roomNumber: "301",
            type: "SUITE",
            floor: 3,
            capacity: 4,
            price: 7000,
            ac: true,
            status: "AVAILABLE",
        },
    });

    const room302 = await prisma.room.create({
        data: {
            roomNumber: "302",
            type: "SUITE",
            floor: 3,
            capacity: 4,
            price: 7000,
            ac: true,
            status: "MAINTENANCE",
        },
    });

    const room401 = await prisma.room.create({
        data: {
            roomNumber: "401",
            type: "PENTHOUSE",
            floor: 4,
            capacity: 6,
            price: 18000,
            ac: true,
            status: "AVAILABLE",
        },
    });

    const room402 = await prisma.room.create({
        data: {
            roomNumber: "402",
            type: "PENTHOUSE",
            floor: 4,
            capacity: 6,
            price: 18000,
            ac: true,
            status: "AVAILABLE",
        },
    });

    // =========================
    // GUESTS
    // =========================

    // =========================
    // GUESTS
    // =========================

    const guest1 = await prisma.guest.create({
        data: {
            guestCode: "G-1001",
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "9876543210",
            address: "Pune, Maharashtra",
            visits: 5,
        },
    });

    const guest2 = await prisma.guest.create({
        data: {
            guestCode: "G-1002",
            name: "Priya Patil",
            email: "priya.patil@gmail.com",
            phone: "9823456712",
            address: "Kolhapur, Maharashtra",
            visits: 2,
        },
    });

    const guest3 = await prisma.guest.create({
        data: {
            guestCode: "G-1003",
            name: "Akash Deshmukh",
            email: "akash.deshmukh@gmail.com",
            phone: "9765432189",
            address: "Nashik, Maharashtra",
            visits: 4,
        },
    });

    const guest4 = await prisma.guest.create({
        data: {
            guestCode: "G-1004",
            name: "Sneha Kulkarni",
            email: "sneha.kulkarni@gmail.com",
            phone: "9898765432",
            address: "Mumbai, Maharashtra",
            visits: 3,
        },
    });

    const guest5 = await prisma.guest.create({
        data: {
            guestCode: "G-1005",
            name: "Rohit Pawar",
            email: "rohit.pawar@gmail.com",
            phone: "9988776655",
            address: "Satara, Maharashtra",
            visits: 1,
        },
    });

    const guest6 = await prisma.guest.create({
        data: {
            guestCode: "G-1006",
            name: "Neha Joshi",
            email: "neha.joshi@gmail.com",
            phone: "9871234567",
            address: "Pune, Maharashtra",
            visits: 2,
        },
    });

    // =========================
    // BOOKINGS
    // =========================

    await prisma.booking.create({
        data: {
            bookingCode: "BK-1001",
            guestId: guest1.id,
            roomId: room101.id,
            checkIn: new Date("2026-07-01"),
            checkOut: new Date("2026-07-04"),
            adults: 1,
            children: 0,
            total: 6000,
            notes: "Business Trip",
            status: "CHECKED_IN",
        },
    });

    await prisma.booking.create({
        data: {
            bookingCode: "BK-1002",
            guestId: guest2.id,
            roomId: room202.id,
            checkIn: new Date("2026-07-05"),
            checkOut: new Date("2026-07-08"),
            adults: 2,
            children: 1,
            total: 10500,
            notes: "Family Vacation",
            status: "CHECKED_IN",
        },
    });

    await prisma.booking.create({
        data: {
            bookingCode: "BK-1003",
            guestId: guest3.id,
            roomId: room201.id,
            checkIn: new Date("2026-07-10"),
            checkOut: new Date("2026-07-12"),
            adults: 2,
            children: 0,
            total: 7000,
            notes: "Upcoming Booking",
            status: "CONFIRMED",
        },
    });

    await prisma.booking.create({
        data: {
            bookingCode: "BK-1004",
            guestId: guest4.id,
            roomId: room301.id,
            checkIn: new Date("2026-06-20"),
            checkOut: new Date("2026-06-23"),
            adults: 3,
            children: 1,
            total: 21000,
            notes: "Completed Stay",
            status: "CHECKED_OUT",
        },
    });

    await prisma.booking.create({
        data: {
            bookingCode: "BK-1005",
            guestId: guest5.id,
            roomId: room401.id,
            checkIn: new Date("2026-07-15"),
            checkOut: new Date("2026-07-17"),
            adults: 2,
            children: 0,
            total: 36000,
            notes: "Cancelled by Guest",
            status: "CANCELLED",
        },
    });

    // =========================
    // ACTIVITIES
    // =========================

    await prisma.activity.createMany({
        data: [
            {
                title: "Guest Checked In",
                description: "Rahul Sharma checked into Room 101.",
                type: "BOOKING",
            },
            {
                title: "Guest Checked In",
                description: "Priya Patil checked into Room 202.",
                type: "BOOKING",
            },
            {
                title: "New Booking Confirmed",
                description: "Booking BK-1003 confirmed for Akash Deshmukh in Room 201.",
                type: "BOOKING",
            },
            {
                title: "Guest Checked Out",
                description: "Sneha Kulkarni checked out from Room 301.",
                type: "BOOKING",
            },
            {
                title: "Booking Cancelled",
                description: "Booking BK-1005 for Rohit Pawar was cancelled.",
                type: "BOOKING",
            },
            {
                title: "Room Under Maintenance",
                description: "Room 302 has been marked for maintenance.",
                type: "ROOM",
            },
            {
                title: "New Guest Registered",
                description: "Neha Joshi was added to the guest database.",
                type: "GUEST",
            },
            {
                title: "Payment Received",
                description: "₹6,000 payment received from Rahul Sharma.",
                type: "PAYMENT",
            },
            {
                title: "Payment Received",
                description: "₹10,500 payment received from Priya Patil.",
                type: "PAYMENT",
            },
            {
                title: "Room Ready",
                description: "Room 301 cleaned and marked available for the next guest.",
                type: "ROOM",
            },
            {
                title: "System",
                description: "GuestFlow database initialized with sample hotel data.",
                type: "SYSTEM",
            },
        ],
    });

    console.log("✅ Database seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });