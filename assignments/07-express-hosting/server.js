import express from "express";

// importing from express library

let app = express();

app.use(express.static("public"));

// use static hosting to serve files

let port = process.env.PORT || 3000;

// using the environment port that render gives or 3000 local

app.listen(port, () => {
    console.log("Server running on port " + port);
});

// time endpoint where when visiting time server returns request of the spec time
app.get("/time",(req,res)=>{
    let time = new Date();
    res.send("The server's clock says: " + time)
});