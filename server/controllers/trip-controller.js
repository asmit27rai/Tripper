const Trip = require("../models/trip-model");

const addTrip = async (req, res) => {
  try {
    const { from, to, hotelName, guideName, hotelPrice } = req.body;
    const userId = req.user._id;

    if (!from || !to || !hotelName || !guideName || !hotelPrice) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const tripCreated = new Trip({
      userId,
      from,
      to,
      hotelName,
      guideName,
      hotelPrice,
    });

    await tripCreated.save();

    res.status(201).json({
      msg: "Trip Added Successfully",
      trip: tripCreated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addTrip };
