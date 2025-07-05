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
import ShoppingCart from "@/components/icons/ShoppingCart";
import Link from "next/link";
import { useCartProductsStore } from "@/store/CartProductStore";
import MenuListItem from "@/components/menu/MenuListItem";
import SearchModal from "@/components/ui/SearchModal";

export default function Menu() {
  const router = useRouter();
  const cartProducts = useCartProductsStore((state) => state.cartProducts);

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
  const [count, setCount] = useState(0);
  const [isCardView, toggleView] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const userData = useUserStore((state) => state.user);

  useEffect(() => {
    setCount(cartProducts.length);
  }, [cartProducts]);


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
      {showSearch ?
      <SearchModal open={showSearch} onClose={() => setShowSearch(false)} /> : null}
      <div className={`flex justify-between px-4 pb-4 bg-${!userData?.dark ? "primary" : "primary"}`}>
        <button
          className={`py-2 px-4 border rounded-full transition-colors flex items-center relative 
            ${!userData?.dark ? "bg-[#2f2e33]" : "bg-white"}
            `}
          aria-label="Filters"
          onClick={() => toggleSortDropdown(!displaySort)}
        >
          <BiSort fontSize={14} color={!userData?.dark ? "white" : "black"} />
          <span className={`ml-1 text-${!userData?.dark ? "white" : "black"} text-xs`}>Filters</span>
        </button>
        {displaySort && (
          <>
            <div className="absolute left-2 top-10 z-50 max-h-96 overflow-y-auto bg-[#23222a] rounded-lg shadow-lg p-4" style={{
              width: "96%"
            }}>
              <div className="py-2 text-xs text-gray-300 font-semibold mb-2">Menu</div>
              {categories?.map((c) => (
                <button
                  key={c._id}
                  className={`px-4 py-2 rounded-full bg-[#2f2e33] text-xs w-max text-white mr-2 mb-2`}
                  onClick={() => {
                    const section = document.getElementById(c._id);
                    const container = document.getElementById('scrollContainer');
                    if (section && container) {
                      container.scrollTo({
                        top: section.offsetTop - 200,
                        behavior: 'smooth'
                      });
                    }
                    toggleSortDropdown(false);
                  }}
                >
                  {c.name}
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
                    toggleSortDropdown(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
              <div className="border-t border-gray-700 my-2 mt-4" />
              
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
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => toggleSortDropdown(false)}
              tabIndex={-1}
              aria-label="Close filters overlay"
            />
          </>
        )}
        <div className="flex items-center space-x-2">
          <div className={`rounded-full border bg-${!userData?.dark ? "[#2f2e33] text-white" : "white text-black"}`} style={{
            padding: "5px 7px",
          }}>
          {!isCardView ?
            <button
              className={`p-1 rounded-full`}
              aria-label="Card view"
              onClick={() => toggleView(true)}
              title="Card view"
            >
              {/* Card/Grid Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button> :
            <button
              className={`p-1 rounded-full`}
              aria-label="List view"
              onClick={() => toggleView(false)}
              title="List view"
            >
              {/* List Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="6" width="16" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="11" width="16" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="16" width="16" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>}
          </div>
          <button
            className={`p-2 rounded-full border bg-${!userData?.dark ? "[#2f2e33]" : "white"} transition-colors`}
            aria-label="Search"
            onClick={() => {
              // Implement search modal or input toggle here
              setShowSearch(true)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-${!userData?.dark ? "white" : "black"}`}
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


      </div>

      <div id="scrollContainer" className={`scrollbar-hide relative bg-${!userData?.dark ? "[#0d0d0d]" : "white"} h-screen overflow-y-auto`}>
        {isCategoryDisplayed && menuData.length && categories?.length > 0 ?
          categories.map((c) => (
            <section className="mt-4" id={c._id} key={c._id}>
              <div className="px-4">
                <SectionHeaders mainHeader={c.name} isDark={!userData?.dark} />
              </div>
              {!isCardView ?
              <div className="px-4 pt-2">
                {menuData
                  ?.filter((item) => item?.category?._id === c._id)
                  .map((product, index) => (
                    <MenuListItem
                      key={index}
                      product={product}
                      hideAddToCart={false}
                    />
                  ))}
              </div> :
              <div className="grid grid-cols-2 gap-4 my-2 px-4" onClick={() => router.push('/details')}>
                {menuData
                  ?.filter((item) => item?.category?._id === c._id)
                  .map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
              </div> }
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
      {/* {displayMenu && (
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
      )} */}
      {count ?
        <Link href={"/cart"} className={`relative text-white`}>
          <div className="fixed left-6 bottom-24 w-12 h-12 bg-primary border rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95`}>">
            {/* <ShoppingCart /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="4" rx="1" />
              <path d="M4 11v7M20 11v7M9 11v7M15 11v7" />
            </svg>
            {count > 0 && (
              <span className={`absolute top-0 right-0 ${!userData?.dark ? "bg-[#0d0d0d] text-white" : "bg-white text-black"} text-xs px-2 py-1 rounded-full leading-3`}>
                {count}
              </span>
            )}
          </div>

        </Link> : null}

      <button
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full border bg-primary text-white text-md font-bold hover:translate-y-[-2px] active:translate-y-0.5 active:shadow-md transition-all duration-200 outline-none focus:outline-none"
        onClick={() => toggleMenu(!displayMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-800 mx-auto"
        >
          {/* Bell dome */}
          <path d="M4 17h16a1 1 0 0 0 1-1v-1a8 8 0 1 0-18 0v1a1 1 0 0 0 1 1z" />
          {/* Base line */}
          <path d="M2 21h20" />
          {/* Bell button top */}
          <path d="M12 5v2" />
          <circle cx="12" cy="4" r="1" />
        </svg>
      </button>
    </div>
  );
}
