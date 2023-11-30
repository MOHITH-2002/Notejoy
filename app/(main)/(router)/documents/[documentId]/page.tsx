"use client"
import { Cover } from '@/components/cover';
import { Spinner } from '@/components/spinner/Spinner';
import { Toolbar } from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import dynamic from "next/dynamic";

import { useMemo } from "react";

import React from 'react'
interface DocumentidPageProps{
  params:{
    documentId:Id<"documents">;

  };

}
const DocumentidPage = ({
  params
}:DocumentidPageProps) => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);

    const update = useMutation(api.documents.update);


  const document = useQuery(api.documents.getById,{
    documentId:params.documentId
  });
 const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    });
  };
  if(document==undefined){
    return(
      <Spinner/>
    )
  }
  if(document===null){
     return(
      <div>
        Not found.
      </div>
    )
  }
  return (
    <div className="pb-40">
      <Cover url={document.coverImage}/>
      <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
        <Toolbar initialData={document}/>
        <Editor
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
      </div>
  )
}

export default DocumentidPage