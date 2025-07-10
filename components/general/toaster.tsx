"use client";
import { appConfig } from "@/boilerplate-config";
import { ToastContainer } from "react-toast";

export default function Toaster() {
  return <ToastContainer position={appConfig.toast_notification.position} />;
}
