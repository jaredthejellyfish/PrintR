import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrintForm = () => {
  const { isAuthenticated, user } = useAuth0();

  console.log(user)

  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState(
    isAuthenticated
      ? "Enter your text here. Press Shift+Enter or submit to print it."
      : "Please log in to print. You can do so by clicking on the profile icon."
  );


  const key = "3t8okfrLoqcDP1ReDVQRHpALXkZB0wmZ";

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      return;
    }
    setPlaceholder(
      "Enter your text here. Press Shift+Enter or submit to print it."
    );
  };

  const handleSubmit = () => {
    if (text.length === 0) return;
    if (!isAuthenticated) {
      alert(
        "Please log in to print. You can do so by clicking on the profile icon."
      );
      return;
    }
    setText("");
    setPlaceholder("Sending...");
    fetch(
      `https://print.jellyhost.eu/pmarkdown?doc=${encodeURIComponent(
        `# ${user.name}:\n\n` + text
      )}&cut=True`,
      {
        method: "GET",
        headers: {
          "x-PrintRAPI-key": key,
        },
      }
    ).then(() => {
      setPlaceholder("Sent!");
    });
  };

  return (
    <div className="print-form-container" onKeyDown={(e) => handleKeyPress(e)}>
      <div className="form">
        <textarea
          value={text}
          placeholder={placeholder}
          cols={2}
          rows={5}
          wrap={"HARD"}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Print‎ ‎ ‎ 🖨️</button>
      </div>
    </div>
  );
};

export default PrintForm;
