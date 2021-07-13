import { MongoClient } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const user = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;

function MeetupDetails() {
  return (
    <MeetupDetail
      img="https://images.unsplash.com/photo-1446569971295-057569541991?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2762&q=80"
      title="Meetout Time!"
      address="Outside somewhere, Some City"
      desc="Meetup Description"
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pw}@cluster0.1ykyz.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // find => first object to filter entires (empty = all), send which fields
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {},
    },
  };
}

export default MeetupDetails;
