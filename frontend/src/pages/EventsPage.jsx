import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  return (
    <>

        <div>
          <Header activeHeading={4} />
          <Loader />
        </div>

    </>
  );
};

export default EventsPage;
