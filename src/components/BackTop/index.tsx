"use client"

import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function BackTop() {
  const [show, setShow] = useState(false)

  const showScrollToTop = () => {
    () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  // 滚到一定程度再出现
  useEffect(() => {
    window.addEventListener("scroll", showScrollToTop)
    return () => {
      window.removeEventListener("scroll", showScrollToTop)
    }
  }, [])
  return (
    <div className={cn("fixed bottom-10 right-10", !show && "hidden")}>
      <Button onClick={scrollToTop} className="rounded-full outline-4 outline-gray-300 shadow-md" variant="outline" size="icon">
        <ArrowUpIcon className="size-4" />
      </Button>
    </div>
  )
}