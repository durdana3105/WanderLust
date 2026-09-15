const express=require("express");
const app=express();
const mongoose=require("mongoose");
const MONGO_URL="mongodb://localhost:27017/wanderlust";
const Listing=require("./models/listing");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log(err);
});

async function main(){
     await mongoose.connect(MONGO_URL);
}


//index route
app.get("/",(req,res)=>{
    res.send("Welcome to WanderLust");
});

app.get("/listings",async(req,res)=>{
     const allListing=await Listing.find({});
     res.render("listings/index.ejs",{allListing});
});

//SHOW ROUTE CODE
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new Villa",
//         description:"By the villa",
//         price:1000,
//         location:"California",
//         country:"USA"
//     });
//      await sampleListing.save();
//      console.log("Listing saved successfully");
//      res.send("Listing saved successfully");
// });

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

