import express from 'express';
import conectarBD from "./db/db.js";
import dotenv from 'dotenv';
dotenv.config();


const main=async()=>{
    await conectarBD();
}
main();