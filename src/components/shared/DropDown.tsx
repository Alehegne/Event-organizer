"use client";

import React, { startTransition, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "../ui/form";
import { ICategory } from "@/lib/mongoDb/database/model/category.model";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";

type DropDownProps = {
  value?: string;
  onchangeHandler?: () => void;
};

const DropDown = ({ onchangeHandler, value }: DropDownProps) => {
  const [categories, setCategory] = React.useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = React.useState<string>("");

  const handleAddCategory = () => {
    //create category
    createCategory({ categoryName: newCategory }).then((category) => {
      setCategory((prev) => [...prev, category]);
      setNewCategory("");
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      if (categoryList) {
        setCategory(categoryList as ICategory[]);
      }
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onchangeHandler} defaultValue={value}>
      <FormControl>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="bg-gray-300 hover:bg-gray-400 mt-1 w-full p-2 rounded-lg text-start">
            Add New Event
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  placeholder="Category Name"
                  className="input-field mt-3"
                  value={newCategory || " "}
                  onChange={(e) => setNewCategory(() => e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
              <AlertDialogAction
                className="w-full bg-purple-800"
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>

              <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropDown;

{
  /* <FormField
  control={form.control}
  name="categoryId"
  render={({ field }) => (
    <FormItem>
      {/* <FormLabel>Email</FormLabel> */
}

//   <FormMessage />
// </FormItem>
