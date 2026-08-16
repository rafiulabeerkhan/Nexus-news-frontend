import { useEffect, useState, useRef } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import useLookUp from "../hooks/useLookup.js";
import showToast from "../utils/toast.js";

const Lookup = ({
  selectedId,
  setSelectedId,
  lookupName,
  isMultiple = false,
  allOption = false,
}) => {
  const { getLookup } = useLookUp();
  const [open, setOpen] = useState(false);
  const [lookupItems, setLookupItems] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchLookup = async () => {
      if (!lookupName) {
        setLookupItems([]);
        return;
      }

      try {
        const response = await getLookup(lookupName);

        if (response?.success) {
          const formatted = Array.isArray(response.data)
            ? response.data.map((item) => ({
                id: item.id,
                value: item.value,
              }))
            : [];

          if (allOption && !isMultiple) {
            const finalData = [{ id: "", value: "All" }, ...formatted];
            setLookupItems(finalData);
            if (selectedId === undefined || selectedId === null) {
              setSelectedId("");
            }
          } else {
            setLookupItems(formatted);
          }
        } else {
          showToast("error", response?.message || "Error");
          setLookupItems([]);
        }
      } catch {
        showToast("error", "Failed to load data");
        setLookupItems([]);
      }
    };

    fetchLookup();
  }, [lookupName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSelected = (id) => {
    if (isMultiple) {
      return selectedId?.includes(id);
    }
    return String(selectedId ?? "") === String(id ?? "");
  };

  const toggleSelect = (id) => {
    if (isMultiple) {
      if (!selectedId) return setSelectedId([id]);

      if (selectedId.includes(id)) {
        setSelectedId(selectedId.filter((x) => x !== id));
      } else {
        setSelectedId([...selectedId, id]);
      }
    } else {
      setSelectedId(id);
      setOpen(false);
    }
  };

  const selectedValue = () => {
    if (isMultiple) {
      const selected = lookupItems.filter((x) => selectedId?.includes(x.id));

      if (!selected.length) return "Select option";

      return (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <span
              key={item.id}
              className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
            >
              {item.value}
            </span>
          ))}
        </div>
      );
    }

    return (
      lookupItems.find((x) => String(x.id) === String(selectedId))?.value ||
      "Select option"
    );
  };

  return (
    <div ref={wrapperRef} className="w-full relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
      >
        <span className="truncate">{selectedValue()}</span>
        <FaChevronDown />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {lookupItems.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm">
              No options available
            </div>
          ) : (
            lookupItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              >
                <span>{item.value}</span>
                {isSelected(item.id) && (
                  <FaCheck className="text-primary-600" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Lookup;
