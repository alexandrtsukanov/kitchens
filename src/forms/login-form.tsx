import { Button, Form } from "@heroui/react";
import { SyntheticEvent } from "react";

const LoginForm = () => {
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted");
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            {/* Form content */}
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default LoginForm;
