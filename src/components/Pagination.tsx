import React, { FC, useEffect, useState } from "react";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import { createLanguageService } from "typescript";

interface IPaginationProps {
  total: number;
  perPage: number;
  change:(page:number) => void;
}

const Pgination:FC<IPaginationProps> = (props:IPaginationProps) =>  {
  const [page, setPage] = useState(1)

  //props.perPage
  //props.total
  //props.change

  const totalPages = () => {
    return (props.total / props.perPage) - 1
  }

  const clickPrev = () => {
    if(page > 1) {
      const prevPage = page - 1
      setPage(prevPage)
      props.change(prevPage)
    }
  }

  const clickNext = () => {
    if(page < totalPages()) {
      const nextPage = page + 1
      setPage(nextPage)
      props.change(nextPage)
    }
  }

  return(
    <div className="pagination justify-content-center align-items-center">
      <button className="pagination-btn pagination-btn-prev" onClick={(e) => clickPrev()} disabled={page == 1}>
        <BsArrowLeft />
      </button>

      <div className="pagination-pages d-flex alig-items-center">
        <div className="pagination-active-page">{page}</div>
        <div className="pagination-pages-separator">/</div>
        <div className="pagination-pages-total">{totalPages()}</div>
      </div>

      <button className="pagination-btn pagination-btn-next" onClick={(e) => clickNext()} disabled={page == totalPages()}>
        <BsArrowRight />
      </button>
    </div>
  )
}

export default Pgination