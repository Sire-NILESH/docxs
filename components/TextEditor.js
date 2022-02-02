import { useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg"; //cant do this here directly as given on the github eg of "react-draft-wysiwyg" because it internally uses a 'window' object that is only available to browsers on client side but here on NEXTJS this will run NodeJS which does not know about 'window' and next js will throw an error 'window is undefined'

// we will dynamically laod it with 'dynamic' provided by "next/dynamic" that import statement to only be imported on client's browser only.
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

// So import { Editor } from "react-draft-wysiwyg"; will be
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor), //only import "Editor" from all other stuff.
  {
    ssr: false, //this tells, dont do this in server-side-rendering
  }
);

function TextEditor() {
  const [session] = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const router = useRouter();
  const { id } = router.query;

  const [snapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  //load the existing contenet of page from the db onto the screen
  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    //push in the db
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()), //convert to serialized
        },
        {
          merge: true, //we need to merge, not replace the old
        }
      );
  };

  return (
    <div className="bg-[#F8F9A] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;
