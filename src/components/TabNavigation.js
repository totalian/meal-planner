const TabNavigation = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="h-16 flex gap-6 items-center w-full pl-4 pt-4">
      {tabs.map((tab, index) => <div
      key={index}
      className={selectedTab === index ? "border-b-4 font-bold" : undefined}
      onClick={() => setSelectedTab(index)}
      >
        {tab}
      </div>)}
    </div>
  )
}

export default TabNavigation
