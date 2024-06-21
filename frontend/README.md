# Frontend

Frontend built with Next.js, ReactJS, Mantine UI.

## Features details

### Display Subjects
Subjects are displayed in a grid layout rather than a traditional table format to enhance responsiveness and provide a more customizable and visually appealing user interface. Grids offer greater flexibility in adapting to various screen sizes and allow for more creative UI designs compared to tables, making the browsing experience more intuitive and engaging.

### Filtering
I've implemented a generic Filter component that provides basic types of inputs (text and date), and can also handle custom inputs (we are sending Sex and Status to it). This component constructs filtering query parameters based on user selections.

### Create a Subject
Displays a modal with a form to create a new subject. It validates the input before enabling the Create button and allows to retry in case of error. Upon successful creation, the list of subjects is refreshed, resetting pagination to the first page while maintaining applied filters. If the filters do not include the new subject, it will not appear in the list immediately after creation.

### Edit/Remove
Each subject card features an action button with options to edit or remove the subject. Upon successful editing or removal, the list is not refreshed. Instead, the subject's details are updated internally. This approach not only avoids unnecessary API calls but also ensures that the user remains on the same page without disrupting their scroll position or losing focus on the subject view due to pagination changes.

### Sorting
Sorting triggers an API call rather than performing local sorting. This ensures that all subjects, including those not currently fetched due to pagination limits, are accounted for in the sorted result.

### Global search
The global search feature allows users to search for subjects by name using a spotlight-like interface. Currently, only the subjects that have been fetched are included in the search results, but this sets the stage for expanding the search to include additional actions or items.

## Setup

1. **Install dependencies:**
```sh
cd frontend
yarn install
```

2. **Start the server:**
```sh
yarn dev
```

The frontend server will run at `http://localhost:3000`.
