## Planned Enhancements

### 1. **Better and Responsive UI**

-   Improve the user interface to ensure a modern, intuitive, and visually appealing design.
-   Optimize layouts for seamless responsiveness across devices (mobile, tablet, and desktop).
-   Focus on accessibility features such as keyboard navigation and ARIA labels for better user experience.

### 2. **Skeleton Screens**

-   Integrate skeleton loaders for a smoother user experience during data fetches.
-   Ensure skeleton designs align with the UI theme for consistency.

### 3. **State Management with Zustand**

-   Implement a Zustand-based store for authentication management.
-   Explore utilizing Zustand for managing other modular states like:
    -   **Starships:** Store and manage data related to starships.
    -   **Selected Films:** Manage the state for films chosen by the user.
-   Note: Avoid overuse of a single data source for multiple places to maintain clean and efficient state handling.

### 4. **Backend Enhancements**

-   Develop and integrate a backend service with the following features:
    -   **Query Operations:** Allow advanced querying capabilities for data.
    -   **Filtering Mechanisms:** Implement robust filters for refined data retrieval.
    -   **Search Functionality:** Add search endpoints for better user experience.
-   Ensure backend APIs are optimized for performance and security.

---

## Folder Structure

-   Follow a modular file organization for clear separation of concerns.
-   Suggested structure:
    ```
    src/
      components/     # UI components
      hooks/          # Custom hooks
      pages/          # Page-specific components
      routes/         # React routers
      services/       # API calls
      store/          # Zustand stores
      styles/         # Pre-defined styling
      theme/          # Mantine theme override
      types/          # Interfaces, Types, Enums,...
      utils/          # Helper functions
    ```

---

## Guidelines for Future Contributions

### Code Standards

-   Adhere to coding standards such as:
    -   Consistent linting with ESLint.
    -   Type-checking with TypeScript.
    -   Clear and concise comments.

### Testing

-   Add unit and integration tests for all new features using preferred testing frameworks.

---

By following this roadmap, we aim to enhance the project’s overall quality and deliver a seamless user experience.
