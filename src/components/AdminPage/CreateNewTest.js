import React from "react";
import {TextInput, Checkbox, Button, Group, Box, Textarea, Text} from '@mantine/core';
import { useForm } from '@mantine/form';
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";

const CreateNewText = observer(() => {

    const {createNewTestStore}=UseMST();

    const form = useForm({
    });

    const accept = (event) => {
        event.preventDefault()
        createNewTestStore.tryCreateNewTest(event.target.title.value, event.target.object.value, event.target.type.value)
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <Text align="center">Создать новый тест</Text>
            <form onSubmit={form.onSubmit=(accept)}>
                <TextInput
                    placeholder="title"
                    label="Название"
                    name="title"
                    required
                />
                <Textarea
                    placeholder="object"
                    label="Объект"
                    name="object"
                    required
                />
                <TextInput
                    placeholder="type"
                    label="Тип"
                    name="type"
                    required
                />
                <Group position="right" mt="md">
                    <Button type="submit">Создать</Button>
                </Group>
            </form>
        </Box>
    );
}
)

export default CreateNewText;