import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const user = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;

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
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pw}@cluster0.1ykyz.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
}

// export async function getServerSideProps(context) {
//   // context param gives access to request and response objects
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API or file system
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
