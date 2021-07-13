// domain.com/new-meetup
import { useRouter } from "next/router";

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

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
