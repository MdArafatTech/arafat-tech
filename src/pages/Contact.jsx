import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const IdentityForm = () => {
  const [form, setForm] = useState({
    name: "",
    father: "",
    mother: "",
    dob: "",
    age: "",
    nationality: "",
    religion: "",
    marital: "",
    village: "",
    district: "",
    thana: "",
    division: "",
    ssc: "",
    hsc: "",
    university: "",
    blood: "",
    hobby: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [preview, setPreview] = useState(false);
  const [qrDataURL, setQrDataURL] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL);
  }, [form]);

  const generatePDF = async () => {
    const doc = new jsPDF({
      unit: "pt", // using points for better control
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    // Background color fill
    doc.setFillColor(255, 249, 195);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Title
    doc.setFontSize(22);
    doc.setTextColor("#92400e");
    doc.setFont(undefined, "bold");
    doc.text("Idendity Form", pageWidth / 2, y, { align: "center" });
    y += 30;

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor("#444");
    doc.setFont(undefined, "normal");
    doc.text("ARAFAT-TECH LTD", pageWidth / 2, y, { align: "center" });
    y += 30;

    // Draw horizontal line
    doc.setDrawColor(150);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 25;

    // Section header helper
const sectionHeader = (title) => {
  y += 20; // Add top margin before the section
  doc.setFontSize(16);
  doc.setTextColor("#ea580c");
  doc.setFont(undefined, "bold");
  doc.text(title, margin, y);
  y += 8;
  doc.setDrawColor(220);
  doc.setLineWidth(0.7);
  doc.line(margin, y, pageWidth - margin, y); // underline
  y += 12;
};


    // Draw a label-value row box, auto-adjust height for multi-line
    const drawRow = (label, value) => {
      const labelWidth = 90;
      const rowWidth = pageWidth - margin * 2;
      const maxValueWidth = rowWidth - labelWidth - 10;
      const fontSize = 11;
      doc.setFontSize(fontSize);

      // Split text to fit max width
      const lines = doc.splitTextToSize(value || "-", maxValueWidth);

      // Row height: 16 per line + padding
      const rowHeight = Math.max(lines.length * 16, 20);

      // Draw rectangle box
      doc.setDrawColor(180);
      doc.rect(margin, y, rowWidth, rowHeight);

      // Label (bold)
      doc.setFont(undefined, "bold");
      doc.setTextColor("#444");
      doc.text(label + ":", margin + 8, y + 14);

      // Value (normal)
      doc.setFont(undefined, "normal");
      doc.setTextColor("#000");
      doc.text(lines, margin + labelWidth + 10, y + 14);

      y += rowHeight + 6;
    };

    // Personal Information
    sectionHeader("Personal Information");
    [
      ["Full Name", form.name],
      ["Father's Name", form.father],
      ["Mother's Name", form.mother],
      ["Date of Birth", form.dob],
      ["Age", form.age],
      ["Nationality", form.nationality],
      ["Religion", form.religion],
      ["Marital Status", form.marital],
      ["Blood Group", form.blood],
      ["Hobby", form.hobby],
    ].forEach(([label, val]) => drawRow(label, val));

    // Address Information
    sectionHeader("Address Information");
    [
      ["Village", form.village],
      ["Thana", form.thana],
      ["District", form.district],
      ["Division", form.division],
    ].forEach(([label, val]) => drawRow(label, val));

    // Education Background
    sectionHeader("Education Background");
    [
      ["SSC Result", form.ssc],
      ["HSC Result", form.hsc],
      ["University", form.university],
    ].forEach(([label, val]) => drawRow(label, val));

    // Image and QR positioning
    const imageWidth = 100;
    const imageHeight = 120;
    const qrSize = 80;

    // Calculate image Y position - keep it near the top right but below title area
    const imageY = margin + 50;

    // Put image top right
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        doc.addImage(
          e.target.result,
          "JPEG",
          pageWidth - margin - imageWidth,
          imageY,
          imageWidth,
          imageHeight
        );

        // Put QR below image, with some margin
        if (qrDataURL) {
          doc.addImage(
            qrDataURL,
            "PNG",
            pageWidth - margin - qrSize,
            imageY + imageHeight + 10,
            qrSize,
            qrSize
          );
        }

        doc.save("idendity_form.pdf");
      };
      reader.readAsDataURL(imageFile);
    } else {
      // No image, just add QR at top right
      if (qrDataURL) {
        doc.addImage(
          qrDataURL,
          "PNG",
          pageWidth - margin - qrSize,
          margin + 50,
          qrSize,
          qrSize
        );
      }
      doc.save("college_admission_form.pdf");
    }
  };

  const inputStyle =
    "p-3 border rounded-lg transition duration-200 hover:border-orange-400";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-black"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full mt-25 max-w-2xl shadow-xl rounded-xl p-8 border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-xl font-bold text-orange-600 text-center w-full">
            Identity Form – Arafat-Tech Ltd
          </h2>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute right-6 top-6 text-sm px-3 py-1 border rounded-lg"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button> */}
        </div>

        {!preview ? (
          <>
            <h3 className="font-semibold mb-2 text-lg">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["name", "Full Name"],
                ["father", "Father's Name"],
                ["mother", "Mother's Name"],
                ["dob", "Date of Birth", "date"],
                ["age", "Age"],
                ["nationality", "Nationality"],
                ["religion", "Religion"],
                ["marital", "Marital Status"],
                ["blood", "Blood Group"],
                ["hobby", "Hobby"],
              ].map(([name, label, type = "text"]) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <h3 className="font-semibold mb-2 text-lg">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["village", "Village"],
                ["thana", "Thana"],
                ["district", "District"],
                ["division", "Division"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <h3 className="font-semibold mb-2 text-lg">Education Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["ssc", "SSC Result"],
                ["hsc", "HSC Result"],
                ["university", "University"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 border rounded-lg"
                aria-label="Upload photo"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setPreview(true)}
              className="mt-6 w-full bg-orange-500 text-white p-3 rounded-xl font-semibold hover:bg-orange-600"
              aria-label="Create form preview"
            >
              Create Form
            </motion.button>
          </>
        ) : (
          <section aria-live="polite" aria-label="Form preview">
            <h3 className="font-semibold mb-2 text-lg">Form Preview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(form).map(([key, val]) => (
                <div key={key} className="border-b py-1">
                  <strong className="capitalize">{key.replace("_", " ")}:</strong>{" "}
                  {val || "-"}
                </div>
              ))}
            </div>
            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded Preview"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}
            <div className="mt-6 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={generatePDF}
                className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700"
                aria-label="Download PDF"
              >
                Download PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setPreview(false)}
                className="w-full bg-gray-500 text-white p-3 rounded-xl font-semibold hover:bg-gray-600"
                aria-label="Edit form"
              >
                Edit Form
              </motion.button>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default IdentityForm;
