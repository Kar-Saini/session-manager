"use client";
import React from "react";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  async function getData() {
    const data = prisma?.session.findUnique({ where: { token: session } });
  }
  const { userName, session } = useUser();
  return (
    <div className="p-2 bg-neutral-100 shadow-md px-4 flex justify-end gap-4">
      <div>Hello {userName}</div>
      <div>Current Session : {session.substring(10)}Hello</div>
    </div>
  );
};

export default Dashboard;
