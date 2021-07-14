import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      img={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      desc={props.meetupData.desc}
    />
  );
}

export async function getStaticPaths() {
  const user = process.env.MONGO_USER;
  const pw = process.env.MONGO_PASSWORD;
  const dbName = process.env.MONGO_DB_NAME;

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
  const user = process.env.MONGO_USER;
  const pw = process.env.MONGO_PASSWORD;
  const dbName = process.env.MONGO_DB_NAME;

  const meetupId = context.params.meetupId;
  console.log("meetupId from params.meetupId", meetupId);

  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pw}@cluster0.1ykyz.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  console.log("meetups collection", meetupsCollection);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log("selectedMeetup data", selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: { ...selectedMeetup, _id: selectedMeetup._id.toString() },
    },
  };
}

export default MeetupDetails;
