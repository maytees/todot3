import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/utils/api";

export default function Home() {

  const { data: sessionData } = useSession();

  function getImage(): string {
    if (sessionData?.user.image) return sessionData.user.image;

    return "/emptyavatar.png";
  }

  const { data: classes, refetch: refetchClasses } = api.class.getAll.useQuery(undefined, {
  });

  const createClass = api.class.createClass.useMutation({
    onSuccess: () => {
      void refetchClasses();
    }
  })

  const deleteClass = api.class.deleteClass.useMutation({
    onSuccess: () => {
      void refetchClasses();
    }
  })

  const createTodo = api.class.createTodo.useMutation({
    onSuccess: () => {
      void refetchClasses();
    }
  })

  const deleteTodo = api.class.deleteTodo.useMutation({
    onSuccess: () => {
      void refetchClasses();
    }
  })

  return (
    <>
      <div className="flex justify-center">
        {
          !sessionData ?
            <div className="flex mt-52 justify-center items-center"><button className="btn btn-lg btn-secondary mt-10" onClick={sessionData ? () => void signOut() : () => void signIn()}>Log in</button></div>
            : <div className="flex flex-col items-center justify-center w-screen">
              <div className="flex flex-col items-center justify-center">
                <Image src={getImage()} alt={sessionData.user.id} width={160} height={160} className="rounded-full mt-10" />
                <button className="btn btn-sm btn-warning mt-5" onClick={sessionData ? () => void signOut() : () => void signIn()}>Sing out</button>
              </div>
              <div className="flex flex-col items-center mt-20">
                <ul className="rounded-box w-56 gap-2 flex justify-center items-center text-center flex-col gap-y-10">
                  {classes?.map((c) => (
                    <li key={c.id}>
                      <div className="flex flex-row gap-x-56">
                        <p
                          className="text-2xl"
                        >{c.name}</p>

                        <div className="flex flex-row gap-x-2">
                          <button className="btn btn-error btn-sm rounded-full" onClick={() => {
                            deleteClass.mutate({
                              classId: c.id
                            })
                          }}>x</button>
                        </div>
                      </div>
                      <ul className="rounded-box w-52 gap-2 mt-5 flex justify-center items-center text-center flex-col gap-y-4">
                        {c.todos?.map((todo) => (
                          <li key={todo.id} className="mt-2 flex flex-row items-center justify-center gap-x-60 ml-52">
                            <p className="text-lg w-36">
                              {todo.title}
                            </p>
                            <div className="flex flex-row gap-x-2 items-center">
                              <button className="btn btn-warning btn-xs rounded-full" onClick={() => {
                                deleteTodo.mutate({
                                  todoId: todo.id
                                })
                              }}>x</button>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <input type="text" placeholder={`Click to add new todo for ${c.name}`} className="ml-14 input-sm input w-full mt-2"
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            createTodo.mutate({
                              title: e.currentTarget.value,
                              classId: c.id
                            });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
                <div className="pb-40">
                  <input type="text" placeholder="Click to add new Class" className="input-lg input input-bordered w-full mt-10"
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        createClass.mutate({
                          name: e.currentTarget.value
                        });
                        e.currentTarget.value = "";
                      }
                    }} />
                </div>
              </div>
            </div >
        }
      </div>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-black">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
