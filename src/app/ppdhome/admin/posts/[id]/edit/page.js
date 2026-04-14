"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm from "@components/PostForm";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/ppdhome/api/posts/${id}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => alert("โหลดข้อมูลไม่ได้"));
  }, [id]);

  if (!data) return <p className="text-center mt-20">Loading...</p>;

  return <PostForm mode="edit" initialData={data} postId={id} />;
}