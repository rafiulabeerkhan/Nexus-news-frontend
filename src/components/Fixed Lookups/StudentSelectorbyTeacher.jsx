import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import useAssignment from "../../hooks/useAssignment";
import { useAuthStore } from "../../store/authStore";
import showToast from "../../utils/toast";

const StudentSelectorbyTeacher = ({
  selectedStudentId,
  setSelectedStudentId,
  selectedTeacherId,
}) => {
  const { authUser } = useAuthStore();
  const { getAssignedStudent } = useAssignment();

  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedTeacherId) return;

      try {
        const res = await getAssignedStudent(selectedTeacherId);

        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data.map((item) => ({
            id: item.user.id,
            name: item.user.name,
          }));

          setStudents(formatted);
        } else {
          setStudents([]);
          showToast("Failed to load students", "error");
        }
      } catch (error) {
        console.error(error);
        setStudents([]);
        showToast("Something went wrong", "error");
      }
    };

    if (selectedTeacherId) {
      fetchStudents();
    }
  }, [authUser, selectedTeacherId]);

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

  const selectedStudent = students.find(
    (student) => String(student.id) === String(selectedStudentId),
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
      >
        <span className="truncate">
          {selectedStudent?.name || "Select Student"}
        </span>

        <FaChevronDown />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {students.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No students found</div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                onClick={() => {
                  setSelectedStudentId(student.id);
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                <span>{student.name}</span>

                {String(student.id) === String(selectedStudentId) && (
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

export default StudentSelectorbyTeacher;
