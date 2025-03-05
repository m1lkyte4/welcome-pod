CREATE DATABASE welcome_pod;
USE welcome_pod;

CREATE TABLE Bookings (
    bookingNumber INT PRIMARY KEY,
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    numberOfGuests INT NOT NULL,
    roomNumber VARCHAR(10) NOT NULL
);
SELECT * FROM Bookings;

INSERT INTO Bookings (bookingNumber, checkInDate, checkOutDate, numberOfGuests, roomNumber) VALUES
(100000, '2023-02-20', '2023-02-25', 2, 101),
(100001, '2023-03-10', '2023-03-15', 1, 102),
(100002, '2023-04-05', '2023-04-10', 3, 103),
(100003, '2023-05-12', '2023-05-17', 2, 104),
(100004, '2023-06-18', '2023-06-22', 4, 105),
(100005, '2023-07-22', '2023-07-27', 1, 106),
(100006, '2023-08-30', '2023-09-04', 2, 107),
(100007, '2023-09-15', '2023-09-20', 3, 108),
(100008, '2023-10-01', '2023-10-06', 2, 109),
(100009, '2023-11-10', '2023-11-15', 1, 110),
(100010, '2023-12-05', '2023-12-10', 2, 111),
(100011, '2024-01-15', '2024-01-20', 3, 112),
(100012, '2024-02-20', '2024-02-25', 2, 113),
(100013, '2024-03-10', '2024-03-15', 1, 114),
(100014, '2024-04-05', '2024-04-10', 4, 115),
(100015, '2024-05-12', '2024-05-17', 2, 116),
(100016, '2024-06-18', '2024-06-22', 3, 117),
(100017, '2024-07-22', '2024-07-27', 2, 118),
(100018, '2024-08-30', '2024-09-04', 1, 119),
(100019, '2024-09-15', '2024-09-20', 2, 120);

SELECT * FROM Bookings;

