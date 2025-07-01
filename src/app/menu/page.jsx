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
import { useUserStore } from "@/store/UserStore";

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
  const [isDark, toggleTheme] = useState(true);

  const userData = useUserStore((state) => state.user);
  

  useEffect(() => {
    if (menuItems) {
      setMenuData(menuItems);
    }
  }, [menuItems]);

  const [filters, setFilters] = useState([{
    label: 'Veg',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-primary'
  }, {
    label: 'Non-Veg',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-primary'
  }, {
    label: 'Spicy',
    selected: false,
    color: 'bg-[#2f2e33]',
    selectedColor: 'bg-primary'
  }]);

  const [sortOptions, updateSortOptions] = useState([{
    label: "Price: Low to High",
    selected: false
  }, {
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
      switch (index) {
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
      <div className={`flex justify-between px-4 pb-2 bg-${!userData?.dark? "[#0d0d0d]" : "white"}`}>
        <button
          className={`py-2 px-4 rounded-full hover:bg-primary transition-colors flex items-center relative bg-${(sortOptions.some(each => each.selected) ||
          filters.some(each => each.selected)) ? "primary" : "[#2f2e33]"}`}
          aria-label="Filters"
          onClick={() => toggleSortDropdown(!displaySort)}
        >
          <BiSort fontSize={14} color="#fff" />
          <span className="ml-1 text-white text-xs">Filters</span>
        </button>
        {displaySort && (
            <>
              <div className="absolute left-2 top-10 z-50 max-h-96 overflow-y-auto bg-[#23222a] rounded-lg shadow-lg p-4" style={{
                width: "96%"
              }}>
                <div className="pb-2 text-xs text-gray-300 font-semibold mb-2">Sort By</div>
                {sortOptions.map((each, idx) => (
                  <button
                    key={each.label}
                    className={`px-4 py-2 rounded-full ${each.selected ? "bg-primary text-white" : "bg-[#2f2e33] text-gray-200"} text-xs w-max text-white mr-2`}
                    onClick={() => {
                      sortMenuItems(idx);
                      toggleSortDropdown(false);
                    }}
                  >
                    {each.label}
                  </button>
                ))}
                <div className="border-t border-gray-700 my-2 mt-4" />
                <div className="py-2 text-xs text-gray-300 font-semibold mb-2">Filter by</div>
                {filters.map((filter) => (
                  <button
                    key={filter.label}
                    className={`px-4 py-2 rounded-full ${filter.selected ? filter.selectedColor : filter.color} text-xs w-max text-white mr-2`}
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
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={() => toggleSortDropdown(false)}
                tabIndex={-1}
                aria-label="Close filters overlay"
              />
            </>
          )}

        <button
          className="p-2 rounded-full bg-[#2f2e33] hover:bg-primary transition-colors"
          aria-label="Search"
          onClick={() => {
            // Implement search modal or input toggle here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
      {/* <div className="flex mb-2 overflow-x-auto scrollbar-hide px-2">
        <BiSort fontSize={26} color={!sortOptions.some(each => each.selected) ? "#ffffff" : "#ef4444"} className="cursor-pointer" onClick={() => toggleSortDropdown(!displaySort)} />
        {displaySort && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#47465c] bg-opacity-40 z-50 flex items-start justify-end">
          <ul className="absolute z-10 mt-10 left-10 text-white
           rounded-lg shadow-lg">
            {sortOptions.map((each, index) => {
              return <li key={each.label} 
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${each.selected ? 'bg-primary' : 'bg-[#47465c]'}`}
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
      </div> */}

      <div id="scrollContainer" className={`scrollbar-hide relative bg-${!userData?.dark? "[#0d0d0d]" : "white"} h-screen overflow-y-auto`}>
        {isCategoryDisplayed && menuData.length && categories?.length > 0 ?
          categories.map((c) => (
            <section className="mt-2" id={c._id} key={c._id}>
              <div className="px-4">
                <SectionHeaders mainHeader={c.name} isDark={!userData?.dark} />
              </div>
              <div className="grid grid-cols-2 gap-4 my-2 px-4" onClick={() => router.push('/details')}>
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
            <div className="grid grid-cols-2 gap-4 my-2 px-4" onClick={() => router.push('/details')}>
              {menuData
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </section>
          : null}
      </div>
      {displayMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#0d0d0d] bg-opacity-40 z-50 flex items-start justify-end">
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
      {/* {isCategoryDisplayed ?
      <button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-white text-md font-bold hover:translate-y-[-2px] active:translate-y-0.5 active:shadow-md transition-all duration-200 outline-none focus:outline-none"
        onClick={() => toggleMenu(!displayMenu)}
        style={{
          boxShadow: "0px 5px 2px 2px rgba(234, 18, 18, 0.94)"
        }}
      >
        Menu
      </button> : null} */}
    </div>
  );
}
