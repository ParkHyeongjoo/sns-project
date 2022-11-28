import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Board from "../components/Board";

import "./Home.scss";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Home");
    axios
      .get("/getposts")
      .then(function (res) {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(function (error) {
        alert("Error");
      });
  }, []);

  return (
    <motion.div
      className="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="content">
        {posts.map((item) => (
          <Board item={item} key={item.board_seq} />
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
