
export default function AppointmentContent (currentAppointmentMetadata) {
  const { zoomlink, title } = currentAppointmentMetadata.appointmentData
  console.log(currentAppointmentMetadata)
  return (
    <div key={currentAppointmentMetadata.appointmentData.id}>
      <div>Hey this is a test</div>
      <div>{zoomlink}</div>
    </div>
  );

}
