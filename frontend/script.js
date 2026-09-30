/* ==========================================================
   DyslexiaLens — FastAPI + Supabase Connected Frontend
   Backend: http://127.0.0.1:8000
   ========================================================== */

console.log("🔥 DyslexiaLens connected frontend loaded");


/* ==========================================================
   API CONFIGURATION
   ========================================================== */

const API_BASE =
  typeof window !== "undefined" &&
  (window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost") &&
  window.location.port === "8000"
    ? ""
    : window.__API_BASE__ || "http://127.0.0.1:8000";


/* ==========================================================
   DOM HELPERS
   ========================================================== */

const $ = (id) => document.getElementById(id);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


/* ==========================================================
   APPLICATION STATE
   ========================================================== */

const APP = {
  state: {
    user: {
      id: "",
      firstName: "User",
      lastName: "",
      email: "",
      phone: ""
    },

    selectedFile: null,

    objectUrl: null,

    currentView: "dashboard",

    totalAnalyses: 0,

    savedReports: 0,

    lastResult: null,

    reports: []
  }
};


/* ==========================================================
   INITIALIZATION
   ========================================================== */

window.addEventListener(
  "DOMContentLoaded",
  init
);


async function init() {

  loadUser();

  loadTheme();

  bindEvents();

  renderUser();

  await checkBackendStatus();


  const token =
    localStorage.getItem(
      "dyslexialens_token"
    );


  if (
    token &&
    APP.state.user &&
    APP.state.user.email &&
    getCurrentUserId() !== null
  ) {

    showPage("app");

    setView("dashboard");

    await loadReports();

    renderDashboard();

    renderReports();

    renderReportChart();

  } else {

    showPage("landing");

  }
}


/* ==========================================================
   CURRENT SUPABASE USER ID
   ========================================================== */

/*
   Your Supabase database uses:

   users.id              BIGINT
   predictions.user_id  BIGINT

   Therefore the frontend must always use a positive
   integer as the current user ID.
*/

function getCurrentUserId() {

  const rawId =
    APP.state.user?.id;


  if (
    rawId === null ||
    rawId === undefined ||
    rawId === ""
  ) {
    return null;
  }


  const id =
    Number(rawId);


  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {

    return null;

  }


  return id;
}


/* ==========================================================
   BACKEND STATUS
   ========================================================== */

async function checkBackendStatus() {

  const pill =
    $("backendStatusPill");


  try {

    await apiRequest("/");


    if (pill) {

      pill.textContent =
        "● API Online";

      pill.style.background =
        "#E7F4EE";

      pill.style.color =
        "#1F8F63";

    }


    return true;

  } catch (error) {

    console.error(
      "Backend status error:",
      error
    );


    if (pill) {

      pill.textContent =
        "○ API Offline";

      pill.style.background =
        "#FDE0DD";

      pill.style.color =
        "#B7463C";

    }


    return false;
  }
}


/* ==========================================================
   API REQUEST HELPER
   ========================================================== */

async function apiRequest(
  path,
  options = {}
) {

  let response;


  try {

    response =
      await fetch(
        `${API_BASE}${path}`,
        options
      );

  } catch (error) {

    throw new Error(
      `Cannot connect to backend (${API_BASE}). ` +
      `Please ensure FastAPI is running on port 8000.`
    );

  }


  let data;


  try {

    data =
      await response.json();

  } catch (error) {

    throw new Error(
      `Backend returned an invalid response (${response.status}).`
    );

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      data?.error ||
      `Request failed with status ${response.status}`
    );

  }


  return data;
}


/* ==========================================================
   EVENT BINDING
   ========================================================== */

function bindEvents() {


  /* --------------------------------------------------------
     GENERAL NAVIGATION
     -------------------------------------------------------- */

  document.addEventListener(
    "click",
    (event) => {

      const action =
        event.target.closest(
          "[data-action]"
        );

      const auth =
        event.target.closest(
          "[data-auth]"
        );

      const view =
        event.target.closest(
          "[data-view]"
        );

      const scroll =
        event.target.closest(
          "[data-scroll]"
        );


      if (action) {

        const actionName =
          action.dataset.action;


        if (
          actionName ===
          "signin"
        ) {

          showAuth("signin");

          return;

        }


        if (
          actionName ===
          "home"
        ) {

          showPage("landing");

          return;

        }

      }


      if (auth) {

        showAuth(
          auth.dataset.auth
        );

        return;

      }


      if (view) {

        setView(
          view.dataset.view
        );

        return;

      }


      if (scroll) {

        const target =
          $(scroll.dataset.scroll);


        target?.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );


  /* --------------------------------------------------------
     SIGN IN
     -------------------------------------------------------- */

  const signinForm =
    $("signinForm");


  if (signinForm) {

    signinForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        event.stopPropagation();

        handleSignIn(event);

      }
    );

  }


  /* --------------------------------------------------------
     SIGN UP
     -------------------------------------------------------- */

  const signupForm =
    $("signupForm");


  if (signupForm) {

    signupForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        event.stopPropagation();

        handleSignUp(event);

      }
    );

  }


  /* --------------------------------------------------------
     DEMO LOGIN BUTTON
     -------------------------------------------------------- */

  $("quickDemoBtn")?.addEventListener(
    "click",
    () => {

      if ($("signinEmail")) {

        $("signinEmail").value =
          "demo@dyslexialens.com";

      }


      if ($("signinPassword")) {

        $("signinPassword").value =
          "demo123";

      }


      showToast(
        "Demo credentials filled. Click Sign in to continue."
      );

    }
  );


  /* --------------------------------------------------------
     GOOGLE
     -------------------------------------------------------- */

  $("googleSignIn")?.addEventListener(
    "click",
    () => {

      showToast(
        "Google sign-in is not connected to the FastAPI backend."
      );

    }
  );


  /* --------------------------------------------------------
     FORGOT PASSWORD
     -------------------------------------------------------- */

  $("forgotPassword")?.addEventListener(
    "click",
    () => {

      showToast(
        "Password reset is not available in the current backend."
      );

    }
  );


  /* --------------------------------------------------------
     LOGOUT
     -------------------------------------------------------- */

  $("logoutBtn")?.addEventListener(
    "click",
    logout
  );


  /* --------------------------------------------------------
     PROFILE
     -------------------------------------------------------- */

  $("editProfileBtn")?.addEventListener(
    "click",
    openProfileModal
  );


  $("closeProfileModal")?.addEventListener(
    "click",
    closeProfileModal
  );


  $("cancelProfileEdit")?.addEventListener(
    "click",
    closeProfileModal
  );


  $("profileForm")?.addEventListener(
    "submit",
    saveProfileChanges
  );


  $("profileModal")?.addEventListener(
    "click",
    (event) => {

      if (
        event.target.id ===
        "profileModal"
      ) {

        closeProfileModal();

      }

    }
  );


  /* --------------------------------------------------------
     PASSWORD VISIBILITY
     -------------------------------------------------------- */

  $$(".show-pass").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const input =
            $(button.dataset.target);


          if (!input) return;


          const hidden =
            input.type ===
            "password";


          input.type =
            hidden
              ? "text"
              : "password";


          button.textContent =
            hidden
              ? "Hide"
              : "Show";

        }
      );

    }
  );


  /* --------------------------------------------------------
     SIDEBAR
     -------------------------------------------------------- */

  $("menuToggle")?.addEventListener(
    "click",
    () => {

      $("sidebar")?.classList.add(
        "open"
      );

    }
  );


  $("sidebarClose")?.addEventListener(
    "click",
    () => {

      $("sidebar")?.classList.remove(
        "open"
      );

    }
  );


  /* --------------------------------------------------------
     THEME
     -------------------------------------------------------- */

  $("themeToggleHeader")?.addEventListener(
    "click",
    toggleTheme
  );


  $("themeToggleSide")?.addEventListener(
    "click",
    toggleTheme
  );


  $("lightThemeChoice")?.addEventListener(
    "click",
    () => setTheme(false)
  );


  $("darkThemeChoice")?.addEventListener(
    "click",
    () => setTheme(true)
  );


  /* --------------------------------------------------------
     RESULT PAGE
     -------------------------------------------------------- */

  $("backToDashboard")?.addEventListener(
    "click",
    () => {

      $("resultPage")?.classList.add(
        "hidden"
      );

      $("appPage")?.classList.remove(
        "hidden"
      );

      setView("reports");

    }
  );


  $("printReport")?.addEventListener(
    "click",
    () => window.print()
  );


  $("saveReport")?.addEventListener(
    "click",
    saveCurrentReport
  );


  $("specialistButton")?.addEventListener(
    "click",
    () => {

      showToast(
        "Specialist directory is not connected."
      );

    }
  );


  /* --------------------------------------------------------
     REPORT SEARCH
     -------------------------------------------------------- */

  $("reportSearch")?.addEventListener(
    "input",
    renderReports
  );


  $("reportFilter")?.addEventListener(
    "change",
    renderReports
  );


  /* --------------------------------------------------------
     ESCAPE KEY
     -------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        !$("profileModal")?.classList.contains(
          "hidden"
        )
      ) {

        closeProfileModal();

      }

    }
  );


  /* --------------------------------------------------------
     UPLOAD
     -------------------------------------------------------- */

  setupUpload();

}


/* ==========================================================
   PAGE NAVIGATION
   ========================================================== */

function showPage(page) {

  $("landingPage")?.classList.toggle(
    "hidden",
    page !== "landing"
  );


  $("authPage")?.classList.toggle(
    "hidden",
    page !== "auth"
  );


  $("appPage")?.classList.toggle(
    "hidden",
    page !== "app"
  );


  $("resultPage")?.classList.add(
    "hidden"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================================
   AUTH PAGE
   ========================================================== */

function showAuth(mode) {

  showPage("auth");


  $("signinPanel")?.classList.toggle(
    "hidden",
    mode !== "signin"
  );


  $("signupPanel")?.classList.toggle(
    "hidden",
    mode !== "signup"
  );

}


/* ==========================================================
   APP VIEW
   ========================================================== */

function setView(viewName) {

  const allowed =
    new Set([
      "dashboard",
      "upload",
      "reports",
      "about",
      "settings"
    ]);


  if (
    !allowed.has(viewName)
  ) {

    viewName =
      "dashboard";

  }


  APP.state.currentView =
    viewName;


  $$(".view").forEach(
    (view) => {

      view.classList.add(
        "hidden"
      );

    }
  );


  $(`view-${viewName}`)
    ?.classList.remove(
      "hidden"
    );


  $$(".side-nav-item[data-view]")
    .forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset.view ===
            viewName
        );

      }
    );


  $("sidebar")?.classList.remove(
    "open"
  );


  if (
    viewName ===
    "reports"
  ) {

    renderReports();

    renderReportChart();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================================
   LOGIN
   ========================================================== */

async function handleSignIn(
  event
) {

  if (event) {

    event.preventDefault();

    event.stopPropagation();

  }


  const email =
    $("signinEmail")
      ?.value
      .trim();


  const password =
    $("signinPassword")
      ?.value;


  if (
    !email ||
    !password
  ) {

    showToast(
      "Please enter your email and password."
    );

    return;

  }


  const submitBtn =
    $("signinForm")
      ?.querySelector(
        "button[type=submit]"
      );


  if (submitBtn) {

    submitBtn.disabled =
      true;

    submitBtn.innerHTML =
      `<span class="spinner"></span> Signing in...`;

  }


  try {

    const data =
      await apiRequest(
        "/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );


    if (!data.success) {

      showToast(
        data.error ||
          "Invalid email or password."
      );

      return;

    }


    const user =
      data.user || {};


    const numericUserId =
      Number(user.id);


    /*
       IMPORTANT

       Supabase users.id is BIGINT.
       Therefore we require a valid
       positive integer here.
    */

    if (
      !Number.isInteger(
        numericUserId
      ) ||
      numericUserId <= 0
    ) {

      throw new Error(
        "Login succeeded, but the backend did not return a valid user ID."
      );

    }


    const nameParts =
      (user.name || "User")
        .trim()
        .split(/\s+/);


    APP.state.user = {

      id:
        numericUserId,

      firstName:
        nameParts[0] ||
        "User",

      lastName:
        nameParts
          .slice(1)
          .join(" "),

      email:
        user.email ||
        email,

      phone:
        ""

    };


    console.log(
      "✅ Logged-in Supabase user:",
      APP.state.user
    );


    localStorage.setItem(
      "dyslexialens_token",
      data.token || ""
    );


    saveUser();

    renderUser();


    showPage("app");

    setView("dashboard");


    showToast(
      "Signed in successfully."
    );


    await loadReports();

    renderDashboard();

    renderReports();

    renderReportChart();


  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );


    showToast(
      error.message ||
        "Unable to connect to backend."
    );


  } finally {

    if (submitBtn) {

      submitBtn.disabled =
        false;

      submitBtn.innerHTML =
        `Sign in <span>→</span>`;

    }

  }

}


/* ==========================================================
   REGISTER
   ========================================================== */

async function handleSignUp(
  event
) {

  if (event) {

    event.preventDefault();

    event.stopPropagation();

  }


  const firstName =
    $("signupFirstName")
      ?.value
      .trim() ||
    "";


  const lastName =
    $("signupLastName")
      ?.value
      .trim() ||
    "";


  const email =
    $("signupEmail")
      ?.value
      .trim() ||
    "";


  const password =
    $("signupPassword")
      ?.value ||
    "";


  if (
    !firstName ||
    !email ||
    !password
  ) {

    showToast(
      "Please fill all required fields."
    );

    return;

  }


  const button =
    $("signupForm")
      ?.querySelector(
        "button[type=submit]"
      );


  if (button) {

    button.disabled =
      true;

    button.innerHTML =
      `<span class="spinner"></span> Creating account...`;

  }


  try {

    const data =
      await apiRequest(
        "/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name:
              `${firstName} ${lastName}`
                .trim(),

            email,

            password

          })

        }
      );


    if (!data.success) {

      showToast(
        data.error ||
          "Registration failed. Please try again."
      );

      return;

    }


    showToast(
      "Account created! Please sign in with your credentials."
    );


    if ($("signinEmail")) {

      $("signinEmail").value =
        email;

    }


    showAuth("signin");


  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );


    showToast(
      error.message ||
        "Unable to connect to backend."
    );


  } finally {

    if (button) {

      button.disabled =
        false;

      button.innerHTML =
        `Create account <span>→</span>`;

    }

  }

}


/* ==========================================================
   LOGOUT
   ========================================================== */

function logout() {

  localStorage.removeItem(
    "dyslexialens_token"
  );


  localStorage.removeItem(
    "dyslexialens_user"
  );


  APP.state.user = {

    id: "",

    firstName:
      "User",

    lastName:
      "",

    email:
      "",

    phone:
      ""

  };


  APP.state.reports = [];

  APP.state.totalAnalyses = 0;

  APP.state.savedReports = 0;

  APP.state.lastResult = null;


  showPage("landing");


  showToast(
    "Signed out."
  );

}


/* ==========================================================
   UPLOAD SETUP
   ========================================================== */

function setupUpload() {

  const input =
    $("fileInput");

  const browse =
    $("browseUploadBtn");

  const stage =
    document.querySelector(
      ".upload-stage"
    );

  const analyze =
    $("appAnalyzeBtn");


  if (
    !input ||
    !browse ||
    !stage ||
    !analyze
  ) {

    console.warn(
      "Upload elements not found."
    );

    return;

  }


  /* --------------------------------------------------------
     BROWSE BUTTON
     -------------------------------------------------------- */

  browse.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();

      input.click();

    }
  );


  /* --------------------------------------------------------
     UPLOAD AREA
     -------------------------------------------------------- */

  stage.addEventListener(
    "click",
    (event) => {

      if (
        !event.target.closest(
          "button"
        )
      ) {

        input.click();

      }

    }
  );


  /* --------------------------------------------------------
     FILE INPUT
     -------------------------------------------------------- */

  input.addEventListener(
    "change",
    () => {

      handleFile(
        input.files?.[0]
      );

    }
  );


  /* --------------------------------------------------------
     DRAG ENTER / OVER
     -------------------------------------------------------- */

  [
    "dragenter",
    "dragover"
  ].forEach(
    (type) => {

      stage.addEventListener(
        type,
        (event) => {

          event.preventDefault();

          event.stopPropagation();

          stage.classList.add(
            "dragover"
          );

        }
      );

    }
  );


  /* --------------------------------------------------------
     DRAG LEAVE / DROP
     -------------------------------------------------------- */

  [
    "dragleave",
    "drop"
  ].forEach(
    (type) => {

      stage.addEventListener(
        type,
        (event) => {

          event.preventDefault();

          event.stopPropagation();

          stage.classList.remove(
            "dragover"
          );

        }
      );

    }
  );


  /* --------------------------------------------------------
     DROP
     -------------------------------------------------------- */

  stage.addEventListener(
    "drop",
    (event) => {

      handleFile(
        event.dataTransfer
          ?.files?.[0]
      );

    }
  );


  /* --------------------------------------------------------
     REMOVE FILE
     -------------------------------------------------------- */

  $("removeAppFile")?.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();

      clearFile();

    }
  );


  /* --------------------------------------------------------
     ANALYZE BUTTON
     -------------------------------------------------------- */

  analyze.addEventListener(
    "click",
    async (event) => {

      event.preventDefault();

      event.stopPropagation();


      console.log(
        "🔥 ANALYZE CLICKED"
      );


      console.log(
        "Selected file:",
        APP.state.selectedFile
      );


      try {

        await runRealAnalysis();

      } catch (error) {

        console.error(
          "🔥 ANALYSIS HANDLER ERROR:",
          error
        );


        showToast(
          error.message ||
            "Analysis failed."
        );

      }

    }
  );

}


/* ==========================================================
   HANDLE FILE
   ========================================================== */

function handleFile(file) {

  if (!file) {

    return;

  }


  const allowed = [

    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp"

  ];


  if (
    !allowed.includes(
      file.type
    )
  ) {

    showToast(
      "Use JPG, JPEG, PNG or WebP."
    );

    return;

  }


  if (
    file.size >
    5 * 1024 * 1024
  ) {

    showToast(
      "Please upload an image under 5 MB."
    );

    return;

  }


  APP.state.selectedFile =
    file;


  if (
    APP.state.objectUrl
  ) {

    URL.revokeObjectURL(
      APP.state.objectUrl
    );

  }


  APP.state.objectUrl =
    URL.createObjectURL(
      file
    );


  if ($("appPreviewImage")) {

    $("appPreviewImage").src =
      APP.state.objectUrl;

  }


  if ($("appFileName")) {

    $("appFileName").textContent =
      file.name;

  }


  if ($("appFileSize")) {

    $("appFileSize").textContent =
      formatBytes(
        file.size
      );

  }


  document
    .querySelector(
      ".upload-stage"
    )
    ?.classList.add(
      "hidden"
    );


  $("uploadPreviewPanel")
    ?.classList.remove(
      "hidden"
    );


  $("appAnalyzeBtn").disabled =
    false;


  showToast(
    "Image selected."
  );

}


/* ==========================================================
   CLEAR FILE
   ========================================================== */

function clearFile() {

  APP.state.selectedFile =
    null;


  if (
    APP.state.objectUrl
  ) {

    URL.revokeObjectURL(
      APP.state.objectUrl
    );

  }


  APP.state.objectUrl =
    null;


  if ($("fileInput")) {

    $("fileInput").value =
      "";

  }


  $("appPreviewImage")
    ?.removeAttribute(
      "src"
    );


  $("uploadPreviewPanel")
    ?.classList.add(
      "hidden"
    );


  document
    .querySelector(
      ".upload-stage"
    )
    ?.classList.remove(
      "hidden"
    );


  if ($("appAnalyzeBtn")) {

    $("appAnalyzeBtn").disabled =
      true;

  }

}


/* ==========================================================
   REAL CNN + SVM ANALYSIS
   ========================================================== */

async function runRealAnalysis() {

  if (
    !APP.state.selectedFile
  ) {

    showToast(
      "Choose an image first."
    );

    return;

  }


  const currentUserId =
    getCurrentUserId();


  /*
     IMPORTANT

     Do not allow a prediction without
     a valid Supabase user ID.

     This prevents the previous:
     user_id = 0
     foreign-key error.
  */

  if (
    currentUserId === null
  ) {

    throw new Error(
      "Your login session does not contain a valid user ID. Please log out and sign in again."
    );

  }


  const button =
    $("appAnalyzeBtn");


  if (!button) {

    throw new Error(
      "Analyze button was not found."
    );

  }


  const original =
    button.innerHTML;


  button.disabled =
    true;


  button.innerHTML =
    `<span class="spinner"></span> Analyzing...`;


  try {

    /* ------------------------------------------------------
       CREATE FORM DATA
       ------------------------------------------------------ */

    const formData =
      new FormData();


    formData.append(
      "file",
      APP.state.selectedFile
    );


    /*
       Supabase:

       users.id = BIGINT
       predictions.user_id = BIGINT

       Send the actual logged-in
       user's ID.
    */

    formData.append(
      "user_id",
      String(
        currentUserId
      )
    );


    console.log(
      "🚀 Sending prediction:",
      {
        user_id:
          currentUserId,

        filename:
          APP.state.selectedFile
            .name
      }
    );


    /* ------------------------------------------------------
       TOKEN
       ------------------------------------------------------ */

    const token =
      localStorage.getItem(
        "dyslexialens_token"
      );


    const headers = {};


    if (token) {

      headers.Authorization =
        `Bearer ${token}`;

    }


    /* ------------------------------------------------------
       SEND TO FASTAPI
       ------------------------------------------------------ */

    const response =
      await fetch(
        `${API_BASE}/predict`,
        {
          method:
            "POST",

          headers,

          body:
            formData
        }
      );


    console.log(
      "Prediction HTTP status:",
      response.status
    );


    let data;


    try {

      data =
        await response.json();

    } catch (error) {

      throw new Error(
        "Backend returned an invalid response."
      );

    }


    console.log(
      "Prediction response:",
      data
    );


    if (!response.ok) {

      throw new Error(
        data?.detail ||
        data?.error ||
        "Prediction failed."
      );

    }


    if (!data.success) {

      throw new Error(
        data.error ||
        "Prediction failed."
      );

    }


    /* ------------------------------------------------------
       SAVE RESULT
       ------------------------------------------------------ */

    APP.state.lastResult =
      data;


    APP.state.totalAnalyses +=
      1;


    updateDashboardStats();


    /* ------------------------------------------------------
       REFRESH HISTORY FIRST, THEN SHOW RESULT
       ------------------------------------------------------ */

    /*
       Load reports BEFORE opening the result page.
       This prevents renderDashboard / renderReports / renderReportChart
       from running after resultPage is shown, which was causing
       the result page to be hidden again (crash to dashboard).
    */

    await loadReports();


    openResult(
      data
    );


  } catch (error) {

    console.error(
      "❌ Prediction error:",
      error
    );


    showToast(
      error.message ||
        "Unable to analyze image."
    );


  } finally {

    button.disabled =
      false;


    button.innerHTML =
      original;

  }

}


/* ==========================================================
   RESULT PAGE
   ========================================================== */

function openResult(data) {

  const confidence =
    clamp(
      Number(
        data.confidence
      ) || 0,

      0,

      100
    );


  const category =
    data.class_name ||
    data.category ||
    "Unknown";


  const possible =
    category !== "Normal";


  $("recommendedActivities")
    ?.classList.toggle(
      "hidden",
      !possible
    );


  if ($("summaryPrediction")) {

    $("summaryPrediction")
      .textContent =
        category;

  }


  if ($("summaryConfidence")) {

    $("summaryConfidence")
      .textContent =
        `${confidence.toFixed(2)}%`;

  }


  if (
    $("summaryConfidenceBar")
  ) {

    $("summaryConfidenceBar")
      .style.width =
        `${confidence}%`;

  }


  if ($("summaryFile")) {

    $("summaryFile")
      .textContent =
        data.filename ||
        APP.state.selectedFile?.name ||
        "sample.jpg";

  }


  if ($("summaryTime")) {

    $("summaryTime")
      .textContent =
        "CNN + SVM";

  }


  const descriptions = {

    Normal:
      "The model classified this handwriting sample as Normal.",

    Reversal:
      "The model classified this handwriting sample as Reversal.",

    Corrected:
      "The model classified this handwriting sample as Corrected."

  };


  if (
    $("summaryDescription")
  ) {

    $("summaryDescription")
      .textContent =
        descriptions[
          category
        ] ||
        "The model returned a result for this sample.";

  }


  if (
    APP.state.objectUrl &&
    $("resultSampleImage")
  ) {

    $("resultSampleImage").src =
      APP.state.objectUrl;

  }


  if ($("summaryIcon")) {

    $("summaryIcon")
      .textContent =
        possible
          ? "!"
          : "✓";


    $("summaryIcon").style.background =
      possible
        ? "#FDE0DD"
        : "#E7F4EE";


    $("summaryIcon").style.color =
      possible
        ? "#B7463C"
        : "#1F8F63";

  }


  if (
    $("summaryConfidenceBar")
  ) {

    $("summaryConfidenceBar")
      .style.background =
        possible
          ? "linear-gradient(90deg,#CA5146,#D88950)"
          : "linear-gradient(90deg,#1F8F63,#65B68F)";

  }


  const probs =
    data.probabilities || {};


  setProbability(
    "Normal",
    probs.Normal
  );


  setProbability(
    "Reversal",
    probs.Reversal
  );


  setProbability(
    "Corrected",
    probs.Corrected
  );


  $("appPage")
    ?.classList.add(
      "hidden"
    );


  $("resultPage")
    ?.classList.remove(
      "hidden"
    );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================================
   PROBABILITY
   ========================================================== */

function setProbability(
  name,
  value
) {

  const safe =
    clamp(
      Number(value) || 0,
      0,
      100
    );


  const valueId =
    `prob${name}`;


  const barId =
    `prob${name}Bar`;


  if ($(valueId)) {

    $(valueId)
      .textContent =
        `${safe.toFixed(2)}%`;

  }


  if ($(barId)) {

    $(barId)
      .style.width =
        `${safe}%`;

  }

}


/* ==========================================================
   HISTORY / REPORTS
   ========================================================== */

async function loadReports() {

  try {

    const userId =
      getCurrentUserId();


    /*
       If there is no valid user ID,
       don't query the database.
    */

    if (
      userId === null
    ) {

      APP.state.reports =
        [];

      APP.state.totalAnalyses =
        0;

      APP.state.savedReports =
        0;


      renderDashboard();

      renderReports();

      renderReportChart();

      return;

    }


    const historyUrl =
      `/history?user_id=${encodeURIComponent(
        userId
      )}`;


    console.log(
      "📋 Loading history for user_id:",
      userId
    );


    const data =
      await apiRequest(
        historyUrl
      );


    if (!data.success) {

      throw new Error(
        data.error ||
          "Unable to load history."
      );

    }


    const history =
      Array.isArray(
        data.data
      )
        ? data.data
        : [];


    APP.state.reports =
      history.map(
        normalizeReport
      );


    APP.state.totalAnalyses =
      APP.state.reports.length;


    APP.state.savedReports =
      APP.state.reports.length;


    renderDashboard();

    renderReports();

    renderReportChart();


  } catch (error) {

    console.error(
      "History error:",
      error
    );


    APP.state.reports =
      [];


    APP.state.totalAnalyses =
      0;


    APP.state.savedReports =
      0;


    renderDashboard();

    renderReports();


    /*
       Don't redirect to homepage
       if history fails.
    */

    showToast(
      "Could not load reports from backend."
    );

  }

}


/* ==========================================================
   NORMALIZE REPORT
   ========================================================== */

function normalizeReport(row) {

  const rawDate =
    row.date ||
    row.created_at ||
    "";


  let date =
    "Unknown date";


  let time =
    "";


  if (rawDate) {

    const parsed =
      new Date(
        rawDate
      );


    if (
      !Number.isNaN(
        parsed.getTime()
      )
    ) {

      date =
        formatDate(
          parsed
        );


      time =
        formatTime(
          parsed
        );

    } else {

      date =
        String(
          rawDate
        );

    }

  }


  return {

    id:
      row.id ||
      "N/A",

    name:
      row.file ||
      row.filename ||
      "handwriting_sample",

    date,

    time,

    prediction:
      row.category ||
      row.class_name ||
      "Unknown",

    confidence:
      Number(
        row.confidence
      ) || 0,

    status:
      row.status ||
      "Completed"

  };

}


/* ==========================================================
   DASHBOARD
   ========================================================== */

function renderDashboard() {

  updateDashboardStats();

  renderRecent();

}


function updateDashboardStats() {

  if ($("totalAnalyses")) {

    $("totalAnalyses")
      .textContent =
        APP.state.totalAnalyses;

  }


  if ($("savedReports")) {

    $("savedReports")
      .textContent =
        APP.state.savedReports;

  }


  if (
    $("reportsActivityTotal")
  ) {

    $("reportsActivityTotal")
      .textContent =
        APP.state.totalAnalyses;

  }


  if (
    APP.state.reports.length
  ) {

    const last =
      APP.state.reports[0];


    if (
      $("lastAnalysisDate")
    ) {

      $("lastAnalysisDate")
        .textContent =
          last.date;

    }


    if (
      $("lastAnalysisTime")
    ) {

      $("lastAnalysisTime")
        .textContent =
          last.time ||
          "Completed";

    }

  } else {

    if (
      $("lastAnalysisDate")
    ) {

      $("lastAnalysisDate")
        .textContent =
          "No analyses";

    }


    if (
      $("lastAnalysisTime")
    ) {

      $("lastAnalysisTime")
        .textContent =
          "—";

    }

  }

}


/* ==========================================================
   RECENT REPORTS
   ========================================================== */

function renderRecent() {

  const list =
    $("recentList");


  if (!list) {

    return;

  }


  if (
    !APP.state.reports.length
  ) {

    list.innerHTML = `
      <div
        style="
          padding:20px;
          text-align:center;
          color:#819088;
        "
      >
        No analyses found yet.
      </div>
    `;

    return;

  }


  list.innerHTML =
    APP.state.reports
      .slice(0, 4)
      .map(
        (report) => `

          <div class="recent-item">

            <div class="recent-thumb">
              A
            </div>

            <div>

              <strong>
                ${escapeHtml(
                  report.name
                )}
              </strong>

              <small>
                ${escapeHtml(
                  report.date
                )}

                ${
                  report.time
                    ? ` • ${escapeHtml(
                        report.time
                      )}`
                    : ""
                }

              </small>

            </div>

            <span class="recent-result">
              ${escapeHtml(
                report.prediction
              )}
            </span>

          </div>

        `
      )
      .join("");

}


/* ==========================================================
   REPORT TABLE
   ========================================================== */

function renderReports() {

  const table =
    $("reportsTableBody");


  if (!table) {

    return;

  }


  const query =
    (
      $("reportSearch")
        ?.value ||
      ""
    )
      .toLowerCase()
      .trim();


  const filter =
    $("reportFilter")
      ?.value ||
    "all";


  const rows =
    APP.state.reports
      .filter(
        (report) => {

          const matchesSearch =
            report.name
              .toLowerCase()
              .includes(
                query
              );


          const matchesFilter =
            filter === "all" ||
            report.prediction
              .toLowerCase()
              .includes(
                filter
              );


          return (
            matchesSearch &&
            matchesFilter
          );

        }
      );


  if (!rows.length) {

    table.innerHTML = `

      <tr>

        <td
          colspan="5"
          style="
            text-align:center;
            padding:30px;
            color:#819088;
          "
        >
          No reports found.
        </td>

      </tr>

    `;

    return;

  }


  table.innerHTML =
    rows
      .map(
        (report) => `

          <tr>

            <td>

              <div class="report-name">

                <div class="report-file-icon">
                  A
                </div>

                <div>

                  <strong>
                    ${escapeHtml(
                      report.name
                    )}
                  </strong>

                  <small
                    style="
                      display:block;
                      color:#87958E;
                      font-size:8px;
                    "
                  >
                    ${escapeHtml(
                      String(
                        report.id
                      )
                    )}
                  </small>

                </div>

              </div>

            </td>


            <td>

              ${escapeHtml(
                report.date
              )}

              ${
                report.time
                  ? `
                    <br>
                    <span
                      style="
                        color:#87958E;
                        font-size:8px;
                      "
                    >
                      ${escapeHtml(
                        report.time
                      )}
                    </span>
                  `
                  : ""
              }

            </td>


            <td>

              <span class="result-tag">
                ${escapeHtml(
                  report.prediction
                )}
              </span>

            </td>


            <td class="confidence-cell">

              <strong>
                ${Number(
                  report.confidence
                ).toFixed(2)}%
              </strong>

            </td>


            <td>

              <button
                class="action-btn"
                data-report-id="${escapeHtml(
                  String(
                    report.id
                  )
                )}"
              >
                Open
              </button>

            </td>

          </tr>

        `
      )
      .join("");


  $$("#reportsTableBody [data-report-id]")
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            openStoredReport(
              button.dataset.reportId
            );

          }
        );

      }
    );

}


/* ==========================================================
   OPEN STORED REPORT
   ========================================================== */

function openStoredReport(id) {

  const report =
    APP.state.reports.find(
      (item) =>
        String(
          item.id
        ) ===
        String(id)
    );


  if (!report) {

    return;

  }


  /*
     Clear the live-upload object URL so the
     result image slot does not show a stale
     blob from the previous live analysis.
  */

  if (APP.state.objectUrl) {

    URL.revokeObjectURL(
      APP.state.objectUrl
    );

    APP.state.objectUrl = null;

  }


  openResult({

    success:
      true,

    id:
      report.id,

    filename:
      report.name,

    category:
      report.prediction,

    class_name:
      report.prediction,

    confidence:
      report.confidence,

    probabilities: {

      Normal:
        report.prediction ===
        "Normal"
          ? report.confidence
          : 0,

      Reversal:
        report.prediction ===
        "Reversal"
          ? report.confidence
          : 0,

      Corrected:
        report.prediction ===
        "Corrected"
          ? report.confidence
          : 0

    }

  });

}


/* ==========================================================
   SAVE CURRENT REPORT
   ========================================================== */

async function saveCurrentReport() {

  /*
     The prediction is already saved by
     FastAPI in Supabase.

     Refresh the reports list silently.

     IMPORTANT: do NOT call renderDashboard / renderReports
     while the result page is visible — those functions
     manipulate appPage DOM and can interfere with the
     result page display.

     We call loadReports only after hiding the result page
     (i.e., we let it run but skip re-renders if result
     page is currently shown).
  */

  showToast(
    "Report already saved to database."
  );


  /*
     Reload history in the background.
     The result page stays visible — navigation
     is not triggered.
  */

  const resultVisible =
    !$("resultPage")
      ?.classList.contains(
        "hidden"
      );


  if (!resultVisible) {

    await loadReports();

  }

}


/* ==========================================================
   REPORT CHART
   ========================================================== */

function renderReportChart() {

  const chart =
    $("reportsBarChart");


  if (!chart) {

    return;

  }


  const reports =
    APP.state.reports
      .slice(0, 7);


  if (
    $("reportsActivityTotal")
  ) {

    $("reportsActivityTotal")
      .textContent =
        APP.state.reports.length;

  }


  if (!reports.length) {

    chart.innerHTML = `

      <div
        style="
          padding:30px;
          text-align:center;
          color:#819088;
        "
      >
        No analysis activity yet.
      </div>

    `;

    return;

  }


  const max =
    Math.max(
      ...reports.map(
        (report) =>
          Number(
            report.confidence
          ) || 0
      ),
      1
    );


  chart.innerHTML =
    reports
      .map(
        (report) => {

          const height =
            Math.max(
              8,
              (
                (
                  Number(
                    report.confidence
                  ) || 0
                ) /
                max
              ) *
                100
            );


          return `

            <div class="report-bar-item">

              <div
                class="report-bar"
                style="
                  height:${height}%;
                "
              ></div>

              <span
                class="report-bar-label"
              >
                ${escapeHtml(
                  report.date
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
                )}
              </span>

            </div>

          `;

        }
      )
      .join("");

}


/* ==========================================================
   USER DISPLAY
   ========================================================== */

function renderUser() {

  const first =
    APP.state.user.firstName ||
    "User";


  const full =
    `${first} ${
      APP.state.user.lastName ||
      ""
    }`.trim();


  const initial =
    first
      .charAt(0)
      .toUpperCase();


  const email =
    APP.state.user.email ||
    "you@example.com";


  if ($("greetingName")) {

    $("greetingName")
      .textContent =
        first;

  }


  if ($("userMiniName")) {

    $("userMiniName")
      .textContent =
        first;

  }


  if ($("userMiniEmail")) {

    $("userMiniEmail")
      .textContent =
        email;

  }


  if ($("headerUserName")) {

    $("headerUserName")
      .textContent =
        first;

  }


  if ($("settingsName")) {

    $("settingsName")
      .textContent =
        full;

  }


  if ($("settingsEmail")) {

    $("settingsEmail")
      .textContent =
        email;

  }


  if ($("settingsPhone")) {

    $("settingsPhone")
      .textContent =
        APP.state.user.phone ||
        "Add a phone number";

  }


  [
    "avatarSmall",
    "avatarHeader",
    "settingsAvatar"
  ].forEach(
    (id) => {

      if ($(id)) {

        $(id).textContent =
          initial;

      }

    }
  );

}


/* ==========================================================
   LOAD USER FROM LOCAL STORAGE
   ========================================================== */

function loadUser() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "dyslexialens_user"
        ) ||
        "null"
      );


    if (!saved) {

      return;

    }


    const numericUserId =
      Number(
        saved.id
      );


    APP.state.user = {

      firstName:
        saved.firstName ||
        "User",

      lastName:
        saved.lastName ||
        "",

      email:
        saved.email ||
        "",

      phone:
        saved.phone ||
        "",

      id:
        Number.isInteger(
          numericUserId
        ) &&
        numericUserId > 0
          ? numericUserId
          : ""

    };


    console.log(
      "Loaded saved user:",
      APP.state.user
    );


  } catch (error) {

    console.error(
      "Could not load saved user:",
      error
    );


    APP.state.user = {

      id: "",

      firstName:
        "User",

      lastName:
        "",

      email:
        "",

      phone:
        ""

    };

  }

}


/* ==========================================================
   SAVE USER
   ========================================================== */

function saveUser() {

  localStorage.setItem(
    "dyslexialens_user",
    JSON.stringify(
      APP.state.user
    )
  );


  console.log(
    "Saved logged-in user:",
    {
      id:
        APP.state.user.id,

      email:
        APP.state.user.email
    }
  );

}


/* ==========================================================
   PROFILE
   ========================================================== */

function openProfileModal() {

  if (
    !$("profileModal")
  ) {

    return;

  }


  if ($("profileFirstName")) {

    $("profileFirstName").value =
      APP.state.user.firstName ||
      "";

  }


  if ($("profileLastName")) {

    $("profileLastName").value =
      APP.state.user.lastName ||
      "";

  }


  if ($("profileEmail")) {

    $("profileEmail").value =
      APP.state.user.email ||
      "";

  }


  if ($("profilePhone")) {

    $("profilePhone").value =
      APP.state.user.phone ||
      "";

  }


  if ($("currentPassword")) {

    $("currentPassword").value =
      "";

  }


  if ($("newPassword")) {

    $("newPassword").value =
      "";

  }


  $("profileModal")
    .classList.remove(
      "hidden"
    );

}


function closeProfileModal() {

  $("profileModal")
    ?.classList.add(
      "hidden"
    );

}


function saveProfileChanges(
  event
) {

  event.preventDefault();


  APP.state.user.firstName =
    $("profileFirstName")
      ?.value
      .trim() ||
    APP.state.user.firstName;


  APP.state.user.lastName =
    $("profileLastName")
      ?.value
      .trim() ||
    APP.state.user.lastName;


  APP.state.user.phone =
    $("profilePhone")
      ?.value
      .trim() ||
    "";


  saveUser();

  renderUser();

  closeProfileModal();


  showToast(
    "Profile updated locally."
  );

}


/* ==========================================================
   THEME
   ========================================================== */

function toggleTheme() {

  setTheme(
    !document.body.classList.contains(
      "dark"
    )
  );

}


function setTheme(dark) {

  document.body.classList.toggle(
    "dark",
    dark
  );


  localStorage.setItem(
    "dyslexialens_theme",
    dark
      ? "dark"
      : "light"
  );


  updateThemeUI(
    dark
  );

}


function loadTheme() {

  setTheme(
    localStorage.getItem(
      "dyslexialens_theme"
    ) ===
      "dark"
  );

}


function updateThemeUI(
  dark
) {

  if ($("themeIconSide")) {

    $("themeIconSide")
      .textContent =
        dark
          ? "☀"
          : "☾";

  }


  if ($("themeTextSide")) {

    $("themeTextSide")
      .textContent =
        dark
          ? "Light mode"
          : "Dark mode";

  }


  if ($("themeToggleHeader")) {

    $("themeToggleHeader")
      .textContent =
        dark
          ? "☀"
          : "☾";

  }


  if ($("currentThemeLabel")) {

    $("currentThemeLabel")
      .textContent =
        dark
          ? "Dark mode"
          : "Light mode";

  }


  $("lightThemeChoice")
    ?.classList.toggle(
      "active",
      !dark
    );


  $("darkThemeChoice")
    ?.classList.toggle(
      "active",
      dark
    );


  if ($("lightThemeCheck")) {

    $("lightThemeCheck")
      .style.display =
        dark
          ? "none"
          : "grid";

  }


  if ($("darkThemeCheck")) {

    $("darkThemeCheck")
      .style.display =
        dark
          ? "grid"
          : "none";

  }

}


/* ==========================================================
   HELPERS
   ========================================================== */

function formatBytes(
  bytes
) {

  if (
    bytes <
    1024
  ) {

    return `${bytes} B`;

  }


  if (
    bytes <
    1024 * 1024
  ) {

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;

  }


  return `${(
    bytes /
    1024 /
    1024
  ).toFixed(1)} MB`;

}


function formatDate(
  date
) {

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day:
        "2-digit",

      month:
        "short",

      year:
        "numeric"
    }
  ).format(date);

}


function formatTime(
  date
) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour:
        "numeric",

      minute:
        "2-digit"
    }
  ).format(date);

}


function clamp(
  value,
  min,
  max
) {

  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );

}


function escapeHtml(
  value
) {

  return String(
    value
  )

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


/* ==========================================================
   TOAST
   ========================================================== */

function showToast(
  message
) {

  let toast =
    $("toast");


  if (!toast) {

    toast =
      document.createElement(
        "div"
      );


    toast.id =
      "toast";


    toast.style.cssText = `
      position:fixed;
      right:22px;
      bottom:22px;
      z-index:99999;
      padding:13px 17px;
      border-radius:12px;
      background:#064E3B;
      color:white;
      font-size:12px;
      font-weight:700;
      box-shadow:0 15px 35px rgba(0,0,0,.2);
    `;


    document.body.appendChild(
      toast
    );

  }


  toast.textContent =
    message;


  toast.style.display =
    "block";


  clearTimeout(
    toast._timer
  );


  toast._timer =
    setTimeout(
      () => {

        toast.style.display =
          "none";

      },
      3500
    );

}