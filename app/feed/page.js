"use client";
import React, { useEffect, useState } from "react";
import PublicCard from "@/app/components/modules/PublicCard";
import { getPosts } from "@/app/apiCalls/post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";

const Feed = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(searchParams.get("sort") || "date");
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching post details");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setSort(searchParams.get("sort") || "date");
    setFilter(searchParams.get("filter") || "");
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    updateQueryParams({ sort: newSort });
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    updateQueryParams({ filter: newFilter });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQueryParams({ search: searchTerm });
  };

  const updateQueryParams = (params) => {
    const currentParams = new URLSearchParams(window.location.search);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    });
    router.replace(`${window.location.pathname}?${currentParams.toString()}`);
  };

  const sortedFilteredSearchedPosts = posts
    .filter((post) => (filter ? post.rentalOrSell === filter : true))
    .filter((post) => {
      if (!searchTerm) return true;
      const searchRegex = new RegExp(searchTerm, "i");
      return (
        searchRegex.test(post.title) ||
        searchRegex.test(post.description) ||
        searchRegex.test(post.city) ||
        searchRegex.test(post.street) ||
        searchRegex.test(post.zipcode) ||
        searchRegex.test(post.facilities.join(" ")) ||
        searchRegex.test(post.rules.join(" "))
      );
    })
    .sort((a, b) => {
      if (sort === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "name") {
        return a.title.localeCompare(b.title);
      } else if (sort === "size") {
        return parseInt(b.size) - parseInt(a.size);
      }
    });

  return (
    <div className="w-full flex items-center justify-start flex-col gap-12 my-16 px-4">
        <form className="flex min-h-[2.75rem] w-full justify-center  items-center " onSubmit={handleSearchSubmit}>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[2.75rem] placeholder:font-thin border bg-transparent min-w-60 flex-shrink-0 outline-none px-2 border-gray-300 rounded-l-md py-2  text-sm text-primary "
            placeholder="e.g Tehran"
          />
          <button
            type="submit"
            className="bg-primary h-[2.75rem] w-12 rounded-r-md text-white text-2xl flex-shrink-0 flex items-center justify-center"
          >
            <LuSearch />
          </button>
        </form>
      <div className="w-full flex flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-1">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded py-2 bg-white  px-1 text-sm text-primary select-hide-arrow outline-none"
          >
            <option value="date" className="text-primary">
              Newest
            </option>
            <option value="name" className="text-primary">
              Name (A-Z)
            </option>
            <option value="size" className="text-primary">
              Size
            </option>
          </select>
        </div>
        <div className="flex items-center gap-1 sm:mt-0">
          <label htmlFor="filter" className="text-sm font-medium">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded py-2 bg-white  px-1 text-sm text-primary select-hide-arrow outline-none"
          >
            <option value="" className="text-primary">
              All
            </option>
            <option value="rental" className="text-primary">
              For Rent
            </option>
            <option value="sell" className="text-primary">
              For Sale
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <div>
          <Skeleton height={40} />
          <Skeleton height={300} />
          <Skeleton count={5} />
        </div>
      ) : (
        sortedFilteredSearchedPosts.map((post, index) => (
          <PublicCard data={post} key={index} />
        ))
      )}
    </div>
  );
};

export default Feed;
