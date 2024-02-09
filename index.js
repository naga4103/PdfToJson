const express = require("express");
const fs = require("fs");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
const extracted = extractor.extract(
  "/home/naganaveena/Downloads/Auto Mail.docx"
);

const port = 8080;
const env = "development";
const app = express();
app.listen(port, () => {
  console.log(`Env: ${env} => Server Listening on http://localhost:${port}`);
});

// fs.readFile("./new.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("error", err);
//   } else {
//     console.log(data);
//     // return res.send({
//     //   data: data,
//     //   //   data: data.toString(),
//     //   success: 1,
//     // });
//   }
//   //  after reading pdf store it in a variable and write your code here
// });
// retur
let arrayOfObj = [];

extracted.then(function (doc) {
  // console.log(doc.getBody());

  const data = doc.getBody();
  const splitData = data.split("Regards,\nTeam Shipyaari");
  //   console.log(splitData);

  splitData.map((eachData, index) => {
    let newSplit1 = eachData.split("\n");
    // console.log("newSplit", newSplit1);
    let objs = {
      id: index + 1,
      nprStatusName: newSplit1[0],
      nprHeader: newSplit1[4],
      nprFooter: newSplit1[6],
      sendEmail: true,
    };
    // console.log(objs);
    arrayOfObj = [...arrayOfObj, objs];
  });
  console.log("arrayOfObj", arrayOfObj);
});

console.log("output", arrayOfObj);
app.post("/readFile", (req, res) => {
  try {
    fs.readFile(
      "/home/naganaveena/Downloads/Auto Mail.docx",
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("error", err);
        } else {
          // console.log(data);
          // var fileData = data;
          // console.log("FileData", typeof fileData);
          res.status(200).json({
            status: "success",
            data: {
              arrayOfObj,
            },
          });
        }
        //  after reading pdf store it in a variable and write your code here
      }
    );
    // return res.send({
    //   data: JSON,
    //   success: 1,
    // });
  } catch (error) {
    // return res.send({
    //   success: 0,
    // });
    res.status(404).json({
      status: "fail",
      message: e.message,
    });
  }
});
