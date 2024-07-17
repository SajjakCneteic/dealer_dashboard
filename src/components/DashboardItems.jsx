const DashboardItem = ({ iconSrc, title, bgColor,icon }) => {
    return (
      <div className={`flex w-full  items-center p-6 ${bgColor} text-white rounded-lg shadow-md hover:scale-105`}>
        <div className="flex-1">
          <div className="text-3xl font-bold">0</div>
          <div>{title}</div>
        </div >
        {/* <img aria-hidden="true" src={iconSrc} alt={`${title} Icon`} /> */}
        <div className="text-4xl">

        {icon}
        </div>
      </div>
    )
  }
  export default DashboardItem;