import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import DocumentRow from "../components/DocumentRow";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { getSession, useSession } from "next-auth/client"; //'getSession'(will run on server side in nodeJS) is not a hook unlike 'useSession'(used in react)
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

export default function Home() {
  // const { data: session, status } = useSession();
  const [session] = useSession();
  if (!session) return <Login />;

  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  //user's email, image and other stuff is available on session provied by auth if logged in.
  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //it's better work according to server timestamps than some specific region's
    });

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Dox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {modal}

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>

            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              rounded={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-400"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>

        {/* user created docs in past */}
        {snapshot?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            filename={doc.data().filename}
            date={doc.data().timestamp}
          />
        ))}
      </section>
    </div>
  );
}

//below is server side code which will run on nodeJS. 'context' will contain all the client request data.
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session, //now can use these props directly in props of index.js and then pass it down the child compos OR use wrap the main '_app.js' with <Provider/> and then these props will readily be available to all components as it was the root compo.
    },
  };
}
