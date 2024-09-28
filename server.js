const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const cookieParser = require("cookie-parser")
const mongodbURL = 'mongodb://127.0.0.1:27017/Lens-and-Light'
const {LogRequestMiddleware , checkAuth} = require("./Middlewares/global")
const {middlewareForHomePage ,} = require("./Middlewares/User");
const userRouter = require("./Routers/user")
const productRouter = require("./Routers/product")
const AdminRouter = require("./Routers/admin")
const {middlewareForProductDetailPage , middlewaretForGetProductType} = require("./Middlewares/product")
const {Product} = require("./models/products")


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(checkAuth)
app.use(LogRequestMiddleware("Log.txt"))
app.use('/uploads', express.static('uploads'));



mongoose.connect(mongodbURL)
  .then(()=> {console.log(`mongodb connected `)})
  .catch(err => console.log(`some error : ${err}`));
  


app.use("/user" , userRouter);
// app.use("/product" , productRouter);
app.use("/admin" , AdminRouter);

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

app.get("/home" , middlewareForHomePage , (req , res)=>{
  const data = req.data ;
  res.render("school" , data);
})

app.get("/product/:id" , middlewareForProductDetailPage , (req , res)=>{
  const product = req.product ;
  res.render("ProductDetail" , {product});
});

const dummyCameraman = {
  userId: "61a1234567890abcdef12345",
  fullName: "John Doe",
  address: "123 Main St, Cityville, Country",
  contactDetails: {
      email: "johndoe@example.com",
      phone: "+1 234 567 8901"
  },
  bio: "Professional cameraman with 5 years of experience in weddings, corporate events, and more.",
  pricingPerDay: 2000,  // Pricing per day in INR
  availableDates: [
      new Date("2024-10-01"),
      new Date("2024-10-05"),
      new Date("2024-10-10")
  ],
  profilePicture: "https://via.placeholder.com/150"  // Dummy profile picture URL
};

app.get('/edit-product/:id', (req, res) => {
  const product = {
      pricePerDay: 1200,
      productName: "prd1",
      productType: "camera",
      productBrand: "brand1",
      productImage: "img1",
      productDescription: "description 1",
      totalPiece: 12
  };
  res.render('editProduct', { product });
});


app.get("/cameraman" , (req , res)=>{
  res.render('pfp2', { cameraman: dummyCameraman  , isOwnProfile : true});
})

app.get('/addproduct' , (req ,res)=>{
  res.render("AddProduct")
})

app.get("/product/productType/:productType" , middlewaretForGetProductType , (req ,res)=>{
  console.log(req.products)
  const products = req.products ;
  console.log(products)
  res.render("cardPage" , {products})
})


app.post('/reservations', async (req, res) => {
  console.log("Reservation request received");
  const { productId, startDate, endDate, numToReserve } = req.body;

  try {
      // Validate input
      if (!productId || !startDate || !endDate || !numToReserve) {
          return res.status(400).send("All fields are required.");
      }

      const product = await Product.findById(productId);
      console.log(product);
      
      if (!product) {
          return res.status(404).send("Product not found");
      }

      const reservedDates = product.reservedDates;
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate date range
      if (end < start) {
          return res.status(400).send("End date must be after start date.");
      }

      // Loop through all dates from startDate to endDate
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const formattedDate = d.toISOString().split('T')[0];  // Format date as 'YYYY-MM-DD'

          // Check if the date already has bookings
          if (reservedDates.has(formattedDate)) {
              // If the date exists, check if there are enough pieces available
              const currentBooking = reservedDates.get(formattedDate);
              if (currentBooking + numToReserve > product.totalPiece) {
                  return res.status(400).send(`Not enough pieces available on ${formattedDate}.`);
              }
              // If the date exists, increase the number of cameras reserved
              reservedDates.set(formattedDate, currentBooking + numToReserve);
          } else {
              // If the date doesn't exist, set the initial reservation
              reservedDates.set(formattedDate, numToReserve);
          }
      }

      // Save the updated product
      await product.save();

      res.send("Reservation successful.");
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while making the reservation.");
  }
});

app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`http://localhost:${port}/home`);
    console.log(" ");
})