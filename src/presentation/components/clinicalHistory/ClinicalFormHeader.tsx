import marcaLogo from '@/assets/documents/logoDocument.png'
import headerMarca from '@/assets/documents/headerMarca.png'

interface ClinicalFormHeaderProps {
  title: string
}

export function ClinicalFormHeader({ title }: ClinicalFormHeaderProps) {
  return (
    <header className="hc-header">
      <div className="hc-header__logo-box">
        <img src={marcaLogo} alt="Marca" className="hc-header__marca" />
      </div>
      <div className="hc-header__right">
        <div className="hc-header__brand-box">
          <img
            src={headerMarca}
            alt="Centro de Especialidades Médicas CC. Preventu"
            className="hc-header__brand-img"
          />
        </div>
        <div className="hc-main-title">{title}</div>
      </div>
    </header>
  )
}
