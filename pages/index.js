import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Meetout Time!",
    image:
      "https://images.unsplash.com/photo-1446569971295-057569541991?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2762&q=80",
    address: "Outside somewhere",
    description: "Simple outdoors meetups",
  },
  {
    id: "m2",
    title: "Meetout x 2!",
    image:
      "https://images.unsplash.com/6/mountain.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    address: "Outside somewhere",
    description: "We made it to a second meetup",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
