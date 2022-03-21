
export default function AppointmentContent (currentAppointmentMetadata) {
  const { zoomlink, title } = currentAppointmentMetadata.appointmentData

  return (
    <div>
      <div>Hey this is a test</div>
      <div>{zoomlink}</div>
    </div>
  );

}
