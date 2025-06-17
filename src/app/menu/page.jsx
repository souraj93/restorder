"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useCategories } from "@/Hooks/useCategories";
import { useMenuItems } from "@/Hooks/useMenuItems";
import { useEffect, useState } from "react";
export default function Menu() {
  const {
    categories,
    error: catError,
    isLoading: catIsLoading,
  } = useCategories();
  const {
    menuItems,
    error: MenuError,
    isLoading: MenuIsLoading,
  } = useMenuItems();

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (menuItems) {
      setMenuData(menuItems);
    }
  }, [menuItems]);

  const [filters, setFilters] = useState([{
    label: 'Veg',
    selected: false,
    color: 'bg-green-100 text-green-700',
    selectedColor: 'bg-green-500 text-white'
  }, {
    label: 'Non-Veg',
    selected: false,
    color: 'bg-red-100 text-red-700',
    selectedColor: 'bg-red-500 text-white'
  }, {
    label: 'Spicy',
    selected: false,
    color: 'bg-yellow-100 text-yellow-700',
    selectedColor: 'bg-yellow-500 text-white'
  }]);

  if (catIsLoading || MenuIsLoading) return <Loading />;

  const handleScroll = (e) => {
    const sectionId = e.target.value;
    const section = document.getElementById(sectionId);
    const container = document.getElementById('scrollContainer');

    if (section) {
      container.scrollTo({
        top: section.offsetTop - 200,
        behavior: 'smooth'
      });
    }
  };

  const filterMenuItems = (filterLabel) => {
    
    const isSelected = filters.find(f => f.label === filterLabel).selected;
    const selectedFilters = filters.filter(f => f.selected).map(f => f.label);

    if (!isSelected) {
      selectedFilters.push(filterLabel);
    } else {
      const index = selectedFilters.indexOf(filterLabel);
      if (index > -1) {
        selectedFilters.splice(index, 1);
      }
    }

    let filteredItems = [];

    if (selectedFilters.length) {
      filteredItems = menuItems.map(item => {
        if ((selectedFilters.includes('Veg') && item.isVeg) ||
      (selectedFilters.includes('Non-Veg') && item.isNonVeg) ||
      (selectedFilters.includes('Spicy') && item.isSpicy)) {
          return item; // Exclude non-veg items
        }
      }).filter(each => each !== undefined);
    } else {
      filteredItems = menuItems; // If no filters are selected, show all items
    }
    
    

    // Update the menuItems state with the filtered items
    // Assuming you have a way to set the menuItems state
    setMenuData(filteredItems);
  }

  return (
    <>
      <div className="flex mb-4 overflow-x-auto scrollbar-hide px-4">
        <select className="border rounded px-4 py-2" onChange={handleScroll}>
          <option value="">Menu</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex items-center ml-4 space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.label}
              className={`px-3 py-1 rounded-full ${filter.selected ? filter.selectedColor : filter.color} text-xs w-max font-semibold`}
              onClick={() => {
                setFilters(filters.map(f =>
                  f.label === filter.label ? { ...f, selected: !f.selected } : f
                ));
                filterMenuItems(filter.label);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div id="scrollContainer" style={{ height: '400px', overflowY: 'scroll' }}>
        {menuData.length && categories?.length > 0 ?
          categories.map((c) => (
            <section className="mt-2" id={c._id} key={c._id}>
                <div className="px-4">
                  <SectionHeaders mainHeader={c.name} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4 mb-4">
                  {menuData
                    ?.filter((item) => item?.category?._id === c._id)
                    .map((item) => (
                      <MenuItem key={item._id} {...item} />
                    ))}
                </div>
            </section>
          )) : null}
      </div>

    </>
  );
}
