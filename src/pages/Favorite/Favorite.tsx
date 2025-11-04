import favIcon from '../../../public/favorite.svg'


const Favorite = () => {
  return (
    <section>
        <div className="container mx-auto">
            <div className="flex justify-center items-center">
                <img src={favIcon} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Favorite