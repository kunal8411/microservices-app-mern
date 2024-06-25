# Microservices-Based Node.js and React Application

I have created a Node.js + React application, and instead of creating a monolithic app, I utilized a microservices architecture.

## Project Description

This application allows users to add posts, and for each post, users can add comments. However, comments will be posted only if they do not contain the word "orange".

### Services

The application consists of five services:

1. **Posts Service:** Manages posts and emits events to the event bus.
2. **Comments Service:** Manages comments and emits events to the event bus.
3. **Moderation Service:** Checks comments for the word "orange" and updates the comment status.
4. **Query Service:** Fetches posts and comments for the frontend, showing their status (pending, approved, rejected).
5. **Event Bus:** Accepts all events from other services and emits them to other services.

### Process Workflow

- **Adding Posts:** Posts are added to the posts collection, and an event is emitted to the event bus saying that a new post has been created.
- **Adding Comments:** When a comment is created, a `commentCreated` event is sent to the event bus. The event bus sends the event to all services that need it.
  - The `commentCreated` event is picked up by the Moderation and Query services, which add the comment data into their own databases. The initial status of the comment is "pending" in the Query service.
  - The Moderation service checks if the comment contains the word "orange". If it does, the status is changed to "rejected"; otherwise, it is changed to "approved". The Moderation service then sends a `commentModerated` event to the event bus.
  - The Query service picks up the `commentModerated` event and updates the comment status in its collection.

### Frontend

The frontend retrieves data from the Query service, allowing users to see the status of comments (pending, approved, or rejected).

## Deployment

This application has been deployed using Docker. Each service runs in its own container, with separate images created for each service.

## Learning Experience

I created this application over a weekend and learned how to:

- Build microservices.
- Manage interactions between microservices.
- Deploy applications using Docker.



## Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies for each service.
3. Build the Docker images for each service.
4. Start the Docker containers.

## License

This project is licensed under the MIT License.

