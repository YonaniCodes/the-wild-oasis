import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./UpdateSetting";
function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSetting();

  if (isLoading) return <Spinner />;
  console.log(settings);
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings;

  console;
  function handleUpdate(e, key) {
    const { value } = e.target;
    if (!value) return;

    // Validate input (example: must be a positive integer)
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      console.error("Invalid input. Please enter a positive number.");
      return;
    }

    let newSetting = {};
    newSetting[key] = parsedValue; // Set key to the new value
    console.log(newSetting);

    // Call updateSettings with error handling
    try {
      updateSettings(newSetting);
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
