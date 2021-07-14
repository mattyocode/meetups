// domain.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    try {
      // internal API hosted by same server so path to file
      // second arg to fetch is config obj
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meet up</title>
        <meta name="description" content="Add your own outdoors meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
