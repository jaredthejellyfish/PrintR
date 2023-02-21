import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import key from "../key.json";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const PrintForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState(
    isAuthenticated
      ? "Enter your text here. Press Shift+Enter or submit to print it."
      : "Please log in to print. You can do so by clicking on the profile icon."
  );
  const [numConfetti, setNumConfetti] = useState(0);

  const { width, height } = useWindowSize();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const inputValidations = () => {
    if (text.length === 0) {
      setPlaceholder("Please enter some text.");
      return false;
    }

    if (text.length > 2000) {
      alert("Please enter less than 2000 characters.");
      return false;
    }

    if (!isAuthenticated) {
      alert(
        "Please log in to print. You can do so by clicking on the profile icon."
      );
      return false;
    }

    return true;
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

  const confettiTimeHandler = () => {
    setNumConfetti(250);
    setTimeout(() => {
      setNumConfetti(0);
    }, 1000);
  };

  const handleSubmit = () => {
    if (text.length === 0) return;
    if (!inputValidations()) return;

    setText("");
    setPlaceholder("Sending...");
    fetch(
      `https://print.jellyhost.eu/pmarkdown?doc=${encodeURIComponent(
        `# ${user.name}:\n\n` + text
      )}&cut=True`,
      {
        method: "GET",
        headers: {
          "x-printrapi-key": key.key,
        },
      }
    )
      .then(() => {
        setPlaceholder("Sent!");

        confettiTimeHandler();
      })
      .catch(() => {
        setPlaceholder("Error sending. Please try again.");
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

      <Confetti numberOfPieces={numConfetti} width={width} height={height} />
    </div>
  );
};

export default PrintForm;
