"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export type Guest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalGuests: number;
  referralSource: string;
};

const PersonalInfoCard = () => {
  const pathname = usePathname();
  const isExtrasPage = pathname === "/reservation/extras";

  const [formData, setFormData] = useState<Guest>({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    totalGuests: 1,
    referralSource: "Instagram",
  });

  const [agreed, setAgreed] = useState({
    rules: false,
    responsibility: false,
  });


  // Load data dari Local Storage saat halaman pertama kali dibuka
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPersonalInfo = localStorage.getItem("personalInfo");
      if (savedPersonalInfo) {
        setFormData(JSON.parse(savedPersonalInfo));
      }

      const savedAgreed = localStorage.getItem("agreedPolicies");
      if (savedAgreed) {
        setAgreed(JSON.parse(savedAgreed));
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!isExtrasPage) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    if (!isExtrasPage) return;
    setFormData({ ...formData, phone: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isExtrasPage) return;
    setAgreed({ ...agreed, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isExtrasPage) return;

    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Nama harus diisi!";
    if (!formData.email) newErrors.email = "Email harus diisi!";
    if (!formData.phone) {
      newErrors.phone = "Nomor HP harus diisi!";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Nomor HP minimal 10 digit!";
    }
    if (!formData.address) newErrors.address = "Alamat harus diisi!";
    if (!agreed.rules) newErrors.rules = "Anda harus menyetujui aturan!";
    if (!agreed.responsibility)
      newErrors.responsibility = "Anda harus menyetujui tanggung jawab!";

    if (Object.keys(newErrors).length > 0) {
      toast.error("Harap lengkapi semua informasi dengan benar!");
      return;
    }

    

    // Simpan ke Local Storage
    localStorage.setItem("personalInfo", JSON.stringify(formData));
    localStorage.setItem("agreedPolicies", JSON.stringify(agreed));

    toast.success("Data berhasil disimpan!");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-[557px] max-h-[1107px] relative">
      <h2 className="text-2xl font-semibold">Personal Info</h2>
      <p className="text-gray-500 text-sm mb-4">
        Tell us a bit about yourself to make your stay seamless and stress-free.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-md"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isExtrasPage}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <div className="relative flex items-center">
            <PhoneInput
              country={"id"}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="81234567890"
              inputClass={`!relative !w-full !p-3 !pl-11 !pr-14 !border !rounded-md !text-lg !font-['Plus_Jakarta_Sans'] ${
                !isExtrasPage ? "!bg-gray-200 cursor-not-allowed" : ""
              }`}
              dropdownClass="custom-dropdown"
              containerClass="w-full"
              disabled={!isExtrasPage}
            />
            <Tooltip
              title="Masukkan nomor HP tanpa angka 0 di depan. Contoh: 81234567890"
              arrow
            >
              <Info
                className="absolute right-3 text-gray-500 cursor-pointer z-10"
                size={18}
              />
            </Tooltip>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-md"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isExtrasPage}
          />
        </div>

        {/* Total Guests */}
        <div>
          <label className="text-sm font-medium">Total Guests</label>
          <input
            type="number"
            name="totalGuests"
            className="w-full p-2 border rounded-md"
            placeholder="Total Guests"
            value={formData.totalGuests}
            onChange={handleChange}
            min="1"
            disabled={!isExtrasPage}
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <textarea
            name="address"
            className="w-full p-2 border rounded-md"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            disabled={!isExtrasPage}
          ></textarea>
        </div>

        {/* Referral Source */}
        <div>
          <label className="text-sm font-medium">
            How did you know Levi Camp?
          </label>
          <select
            name="referralSource"
            className="w-full p-2 border rounded-md"
            value={formData.referralSource}
            onChange={handleChange}
            disabled={!isExtrasPage}
          >
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="border p-4 rounded-md bg-gray-50">
          <p className="font-semibold">Confirm Understanding of All Policies</p>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="rules"
              checked={agreed.rules}
              onChange={handleCheckboxChange}
              disabled={!isExtrasPage}
            />
            <p className="text-sm">
              I agree to all{" "}
              <span className="font-semibold">camping rules & regulations</span>.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="responsibility"
              checked={agreed.responsibility}
              onChange={handleCheckboxChange}
              disabled={!isExtrasPage}
            />
            <p className="text-sm">
              I acknowledge my{" "}
              <span className="font-semibold">responsibility</span> to keep
              nature clean.
            </p>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      {isExtrasPage && (
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 bg-orange-500 text-white rounded-md mt-4"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default PersonalInfoCard;
