"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { useCategories } from "@/Hooks/useCategories";
import { useMenuItems } from "@/Hooks/useMenuItems";
import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
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
  const [displayMenu, toggleMenu] = useState(false);
  const [displaySort, toggleSortDropdown] = useState(false);
  const [isCategoryDisplayed, toggleCategory] = useState(true);

  useEffect(() => {
    if (menuItems) {
      setMenuData(menuItems);
    }
  }, [menuItems]);

  const [filters, setFilters] = useState([{
    label: 'Veg',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-red-500'
  }, {
    label: 'Non-Veg',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-red-500'
  }, {
    label: 'Spicy',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-red-500'
  }]);

  const [sortOptions,updateSortOptions] = useState([{
    label: "Price: Low to High",
    selected: false
  },{
    label: "Price: High to Low",
    selected: false
  }, 
  // {
  //   label: "Rating: Low to High",
  //   selected: false
  // }
  ]);

  if (catIsLoading || MenuIsLoading) return <Loading />;

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
    setMenuData(filteredItems);
  };

  const sortMenuItems = (index) => {
    const localSortOptions = [...sortOptions];

    if (!sortOptions[index].selected) {
      toggleCategory(false);
      switch(index) {
      case 0:
        setMenuData([...menuData].sort((a, b) => a.basePrice - b.basePrice));
        break;
      case 1:
        setMenuData([...menuData].sort((a, b) => b.basePrice - a.basePrice));
        break;
        // default:
        //   setMenuData([...menuData].sort((a, b) => b.basePrice - a.basePrice));
        //   break;
      }
    } else {
      toggleCategory(true);
    }
    localSortOptions.forEach((each, ind) => {
      if (index !== ind) {
        each.selected = false;
      }
    });
    localSortOptions[index].selected = !localSortOptions[index].selected;
    updateSortOptions([...localSortOptions]);

  };

  return (
    <div className="h-screen relative">
      <div className="flex mb-2 overflow-x-auto scrollbar-hide px-2">
        <BiSort fontSize={26} color={!sortOptions.some(each => each.selected) ? "#ffffff" : "#ef4444"} className="cursor-pointer" onClick={() => toggleSortDropdown(!displaySort)} />
        {displaySort && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-start justify-end">
          <ul className="absolute z-10 mt-10 left-10 text-white
           rounded-lg shadow-lg">
            {sortOptions.map((each, index) => {
              return <li key={each.label} 
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${each.selected ? 'bg-red-500' : 'bg-[#47465c]'}`}
              onClick={() => {
                sortMenuItems(index);
                toggleSortDropdown(false);
              }}
              >{each.label}</li>
            })}
          </ul>
          <div
            className="flex-1 h-full"
            onClick={() => toggleSortDropdown(false)}
            tabIndex={-1}
            aria-label="Close category menu"
          />
          </div>
        )}
        <div className="flex items-center space-x-2 ml-2">
          {filters.map((filter) => (
            <button
              key={filter.label}
              className={`px-4 py-2 rounded-full ${filter.selected ? filter.selectedColor : filter.color} text-xs w-max text-white`}
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

      <div id="scrollContainer" className="scrollbar-hide relative bg-black" style={{ height: '100vh', overflowY: 'scroll' }}>
        {isCategoryDisplayed && menuData.length && categories?.length > 0 ?
          categories.map((c) => (
            <section className="mt-2" id={c._id} key={c._id}>
              <div className="px-2">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid grid-cols-2 gap-4 my-2 px-2 cursor-pointer" onClick={() => router.push('/details')}>
                {menuData
                  ?.filter((item) => item?.category?._id === c._id)
                  .map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
              </div>
            </section>
          )) : null}
          {!isCategoryDisplayed && menuData.length ? 
            <section className="mt-2">
              <div className="grid grid-cols-2 gap-4 my-2 px-2 cursor-pointer" onClick={() => router.push('/details')}>
                {menuData
                  .map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
              </div>
            </section>
          : null}
      </div>
      {displayMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-start justify-end">
          <div className="bg-[#47465c] rounded-lg shadow-lg mt-0 mr-0 w-64 max-h-48 overflow-y-auto absolute bottom-24 right-8">
            <ul className="divide-y">
              {categories?.map((c) => (
                <li
                  key={c._id}
                  className="px-4 py-3 cursor-pointer hover:bg-[#0d0d0d] transition"
                  onClick={() => {
                    const section = document.getElementById(c._id);
                    const container = document.getElementById('scrollContainer');
                    if (section && container) {
                      container.scrollTo({
                        top: section.offsetTop - 200,
                        behavior: 'smooth'
                      });
                    }
                    toggleMenu(false);
                  }}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex-1 h-full"
            onClick={() => toggleMenu(false)}
            tabIndex={-1}
            aria-label="Close category menu"
          />
        </div>
      )}
      {isCategoryDisplayed ?
      <button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-red-500 text-white text-md font-bold hover:translate-y-[-2px] active:translate-y-0.5 active:shadow-md transition-all duration-200 outline-none focus:outline-none"
        onClick={() => toggleMenu(!displayMenu)}
        style={{
          boxShadow: "0px 5px 2px 2px rgba(234, 18, 18, 0.94)"
        }}
      >
        Menu
      </button> : null}
    </div>
  );
}
