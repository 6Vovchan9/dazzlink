import { AfterViewInit, Component, signal } from '@angular/core';
import { AbsractExample } from '@app/shared/helpers/classes/abstract.class';
import { ourTeamList } from '@app/shared/constants/ourTeam.constants';
import { IAboutPersonalData } from '@app/shared/interfaces';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent extends AbsractExample implements AfterViewInit {

  public ourPersonal: Array<IAboutPersonalData> = ourTeamList;
  public showNavModal = false;
  public chosenPersonData: IAboutPersonalData;

  public mainPicBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAJcklEQVR4AQCBAH7/AF1oo/9ga6b/Z3Cq/293r/94f7X/gYW5/4mLu/+Qjrv/lZC6/5qQt/+ekLP/o5Cv/6iQq/+vkaj/t5Om/7+Vpf/JmKX/05um/92fp//no6j/8aap//qoqv//qqr//6mo//+mpP//oJ7//5iV//+Pi//5hYH/8nt4/+10cP/pcGz/AIEAfv8AWGuj/1xupv9ic6r/anqv/3OBtP98iLn/hI27/4uRvP+Rk7r/lpS3/5qUtP+flLD/pZSs/6uVqf+zlqf/vJmn/8Wcpv/Pn6f/2qOo/+Snqv/uqqv/962s//+urP//rqv//6un//+mof//npn//pWP//iLhf/xgnz/63t0/+h3cf8AgQB+/wBPcKP/U3Om/1l4qv9hf6//a4e1/3SOuf98k7z/g5e9/4mZu/+Omrn/k5u1/5ibsv+em67/pJys/6yeqv+1oan/v6Sp/8mnqv/Tq6v/3q+t/+izr//ytrD/+rix//+4sP//tqz//7Gn//+qn//8oZb/9ZiM/++Pg//qiHz/54R4/wCBAH7/AER4pP9Ie6f/ToCr/1aHsP9gj7b/aZa7/3Kcvv95oL//f6O+/4WkvP+Kpbn/j6W1/5Wmsv+cp7D/pKmu/62srv+2r67/wbOv/8u3sP/Wu7L/4b+0/+vDtv/0xbf/+sa3//7EtP//wLD//bqp//ixoP/zqZf/7KCO/+iah//lloT/AIEAfv8AOYKn/z2Fqf9Diq7/S5Gz/1WZuf9eoL7/Z6bB/2+rwv91rsL/e7DA/4Gxvv+Gsrv/jbO4/5S0tv+ctrT/pbm0/668tP+4wLX/w8S3/87Juf/Zzbv/5NG+/+3VwP/01sD/+dW+//vSuv/5zLT/9sWs//C8o//rtJv/5q6V/+Orkf8AgQB+/wAwjaz/NJCu/zqWsv9Cnbj/TKS+/1Wsw/9essb/ZrfI/227yP90vcf/eb7E/4DAwv+GwcD/jcO+/5XFvP+ex7z/p8u8/7LOvf+807//yNfB/9PcxP/e4cf/6OXJ//Dny//158r/+OTH//ffwf/02br/79Gy/+rJqv/lw6T/48Ch/wCBAH7/ACuZs/8unLX/NaG5/z2ov/9GsMT/ULjJ/1m+zf9hw8//acfQ/2/Kz/91zM3/fM3L/4LPyf+K0cf/kdPG/5rVxf+j2MX/rdzG/7jgyP/D5cr/z+rN/9rv0f/k89T/7fbW//P31f/29dP/9vHO//TryP/v48D/69y5/+bXs//k07D/AIEAfv8AK6S8/y6nvv80rML/PLPH/0W6zf9PwtL/WMjV/2DO2P9o0tj/b9XY/3XX1v982dX/gtrT/4nc0f+R3s//meHP/6Ljzv+s58//tuvR/8Lw0//N9db/2fra/+P/3v/s/+D/8//g//f/3//3/9r/9fnU//Hyzf/t68b/6ebA/+bjvf8AgQB+/wAvrMX/Mq/H/zi0y/9AutD/ScLV/1LJ2v9bz97/ZNXg/2vZ4f9y3OH/ed7g/3/g3v+G4tz/jeTa/5Tm2f+c6Nj/perX/67t1/+48dn/w/bb/8773v/a/+L/5f/m/+7/6P/1/+n/+f/o//r/5P/4/97/9PrY//D00f/s7sv/6uvI/wCBAH7/ADevzv86stD/QLfT/0e92P9QxN3/Wcvi/2LR5f9q1uf/ctvo/3ne6P9/4ef/huPm/43k5P+T5uL/m+jg/6Lp3/+q697/s+7e/7zx3v/H9eH/0vrk/93/6P/o/+v/8v/u//n/7//9/+7//v/r//z/5f/4+97/9PTX//Dv0v/u7M//AIEAfv8AQq3U/0Wv1v9KtNr/Urre/1rA4/9ix+f/a83q/3PS7P961u3/gdrt/4jc7P+P3+v/leDp/5zi5/+j4+X/quTj/7Hm4f+56OH/wuvh/8zv4//X8+b/4vjq/+397f/2//D//f/x////8P///+3///rn//304P/47dn/9OfU//Lk0P8AgQB+/wBOpdj/Uafa/1ar3f9dseH/ZLfl/2296f91w+z/fcju/4TM7v+Lz+7/kdLt/5jU7P+e1ur/pdfo/6vY5v+y2eP/udri/8Db4f/J3uH/0uHi/9zm5f/n6uj/8u/r//vz7v//9e////Tu///x6v//6+T//+Td//zd1v/32ND/9dXN/wCBAH7/AFqX2P9dmdr/YZ3c/2ei4P9vp+T/dq3n/36z6v+Gt+v/jbvs/5S/7P+awev/ocPq/6fF6P+txub/s8fj/7nI4f/AyN7/x8nd/8/L3f/Yzt3/4tLg/+zX4//22+b//9/o///g6f//3+j//9zk///W3f//z9b//sfP//rCyf/3vsb/AIEAfv8AZIXV/2eH1v9ritn/cY/c/3iU3/9/muL/hp/l/42j5v+Up+f/m6rn/6Kt5v+or+T/rrHi/7Sy4P+6s97/wLPb/8az2P/NtNb/1LXW/9241v/mvNj/8MDb//rE3v//x+D//8jg///H3///w9r//73U//+1zP//rsT/+qi+//iku/8AgQB+/wBsctD/b3PR/3N30/94e9b/foDZ/4WF3P+Mit7/k47f/5qS3/+hld//p5fe/66a3f+0m9v/upzZ/8Cd1v/FndP/y53R/9Gezv/Yn83/4KHO/+mkz//zqNL//KzU//+v1v//sNb//67U//+qz///o8n//5vB//+Uuf/6jbL/+Iqv/wCBAH7/AHJgyv90Ycv/eGTN/31o0P+DbdL/inLV/5F21v+Xetf/nn7Y/6WB2P+rhNf/sobW/7iI1P++idH/w4nP/8mJzP/Oicn/1InG/9uKxf/jjMX/7I/G//WTyf/+lsv//5nM//+ZzP//mMr//5PF//+Mvv//hLb//3yt//p2p//3cqP/AIEAfv8AdlLF/3hTxv97Vsj/gFrK/4Zezf+NY8//k2fQ/5pr0f+gb9L/p3LR/6110f+0d8//unnO/8B6y//Fesj/y3rF/9B6wv/WesD/3Xu+/+R8vv/tf7//9oPB//+GxP//iMX//4nF//+Hwv//gr3//3u2//9yrf/+aqX/+WSe//Zgm/8BgQB+/wB4SsL/eUzD/31Pxf+CUsf/iFfJ/45by/+UX83/m2PO/6Fnzv+oas7/rmzN/7VvzP+7cMr/wXLI/8Zyxf/McsL/0XK//9dyvP/dcrv/5XS7/+13vP/2er7//33A//+Awf//gMH//36+//95uP//cbH//2mo//1hoP/4Wpn/9VeW/+/HIWcSfL68AAAAAElFTkSuQmCC';
  public miniMainPicBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQxklEQVR4AQCBAH7/AHWfx/92n8f/d5/H/3eex/93ncX/dprD/3SWv/9ykrv/cI62/3CLs/9yibH/doqx/3yMs/+Fkbb/jpa6/5ibvv+ioMH/q6TD/7Oow/+6q8T/wq3E/8mwxP/Rs8T/2LbE/964xP/iucL/5bi//+a2u//ls7f/47Cy/+Gsrv/gq6z/AIEAfv8AeKPK/3mjyv96o8v/eqPK/3qiyf95n8f/d5vD/3WXvv9zkrr/c4+2/3WNtP95jrT/f5C2/4eUuf+Qmbz/mp7A/6Ojwv+rp8T/s6rF/7utxf/Cr8X/yrLF/9G1xf/YuMX/3rrE/+O7w//lusD/5ri8/+W1uP/ksrP/4q+v/+Gtrf8AgQB+/wB+q9D/fqvQ/3+s0f+Aq9H/gKrP/3+nzf99pMn/e5/F/3mbwP94l73/epW6/32Vuv+Dl7v/i5u9/5OfwP+cpMP/pajF/62rxv+0rsb/u7DG/8Kyxv/Ktcb/0bjG/9i7xv/evcb/477E/+a+wv/nvL7/5rm6/+W2tf/js7L/4rKv/wCBAH7/AIS11/+Etdj/hbbY/4a22P+Gtdf/hrLV/4Sv0f+Cqs3/gKbI/3+ixP+AoML/g5/A/4ihwf+Po8P/l6fF/5+rx/+nrsj/rrHJ/7WzyP+7tMj/wrbH/8m5x//QvMf/17/H/97Bx//jw8b/5sPE/+fBwP/nv7z/5ry4/+S5tP/juLP/AIEAfv8Aib/e/4nA3v+LwN//jMDf/4zA3/+Mvt3/irrZ/4i21f+GsdD/ha3M/4aryf+Iqsf/jarH/5OtyP+ar8r/obLL/6i1y/+utsv/tLjK/7q5yf/Bu8f/yL3H/8/Ax//Ww8f/3cXH/+LHx//myMX/58fC/+fFvv/nwrv/5cC3/+W/tv8AgQB+/wCLyOL/jMjj/47J5P+PyuT/kMnk/5DI4/+PxeD/jcHc/4u81/+KuNP/irXP/4y0zf+QtM3/lbXN/5y3zf+iuc7/qLvN/668zP+zvcr/ub7J/76/x//Fwcb/zMTG/9PHx//aysf/4MzH/+TNxv/mzcP/58vA/+fJvf/mx7r/5ca4/wCBAH7/AIvN4/+MzuT/jtDl/5DR5/+S0ef/ktDm/5HN5P+QyuD/jsbc/43C2P+Nv9T/j73S/5K90P+XvdD/nL/Q/6LAz/+nwc7/rMHM/7HByv+2wsj/u8LG/8HExf/Jx8X/0MvG/9fOx//d0cf/4tLG/+XSxP/m0cL/5tC//+XOvP/lzbv/AIEAfv8AiNDh/4nR4v+L0+T/jtXm/5DW5/+R1ef/kdTl/5DR4v+Pzd7/jsna/47G1/+QxNT/k8TT/5fE0v+cxdH/oMbQ/6XGz/+pxsz/rsXJ/7LFx/+3xsX/vsjE/8XLxP/NzsX/1NLG/9vVx//g2Mb/49jF/+XYw//l1sD/5dW+/+TUvf8AgQB+/wCB0N3/g9Le/4bU4P+J1uP/jNjl/47Y5f+P1+T/j9Xi/47S3/+Nz9v/jszY/4/L1v+SytT/lsrT/5rL0v+fy9H/o8vP/6fKzP+rysn/r8nG/7TKxP+6zMP/wc/D/8nTxP/R18b/2NrH/97dx//i3sb/5N7F/+Tdwv/k3MD/5Ny//wCBAH7/AHrP1v980Nj/f9Pb/4PW3v+H2OH/itri/4va4v+M2OH/jNbe/4zT2/+N0dn/jtDW/5HP1f+Vz9T/mdDT/57Q0f+i0M//pc/M/6nOyf+tzsb/ss7D/7jQwv+/08P/x9fE/8/cxv/X4Mj/3ePI/+HlyP/j5cf/5OXF/+Xkw//l48L/AIEAfv8AcszQ/3TN0v940dX/fdTZ/4HY3P+F2t//h9vf/4na3/+K2d3/itfb/4vV2f+O1Nf/kdTW/5XV1f+Z1dT/ndXS/6HV0P+l1M3/qNPK/6zTx/+x08T/t9XD/77ZxP/G3cX/z+LH/9bmyf/d6cr/4evK/+Tsyf/l7Mj/5uvG/+brxf8AgQB+/wBsycr/bsvM/3LOz/9309T/fNfY/4Ha2/+E293/htzd/4jb3P+J2tv/i9nZ/47Y2P+R2df/ldnW/5ra1v+e2tT/otrS/6XZz/+p2cz/rdjI/7HZxv+328X/v97G/8fix//P58r/1+zM/97vzf/i8s3/5fPM/+fyy//n8sr/5/LJ/wCBAH7/AGfGxf9pyMf/bszL/3PR0P951dX/ftnY/4Lc2/+F3dz/h93b/4nc2v+L29n/jtzZ/5Lc2P+W3dj/m97Y/6Df1v+j39T/p97R/6rdzv+u3cv/s97J/7ngyP/A48j/yOfK/9HszP/Y8c7/3/TP/+T30P/n+M//6PjO/+n3zf/p98z/AIEAfv8AZMPB/2bGw/9rysj/cc/N/3fU0v992Nb/gdvZ/4Td2/+H3dv/id3a/4zd2v+P3dn/k97Z/5jg2f+d4dn/oeLY/6Xi1v+p4tP/rOHQ/7Dhzf+14cv/uuPK/8Lmyv/K68z/0u/O/9n00P/g+NH/5frR/+j70f/p+8//6vvO/+r6zf8AgQB+/wBjwb//ZsPB/2rIxv9wzcv/d9LQ/3zX1f+B2tj/hdza/4fc2v+K3Nr/jN3Z/5Dd2f+U39n/meDa/57i2v+j49n/p+PX/6rj1P+u4tH/seLO/7bizP+85Mv/wufL/8rrzP/S8M7/2vXQ/+D40f/k+tH/5/vR/+n7z//p+87/6vvN/wCBAH7/AGS/vv9nwcD/a8XF/3HLyv940M//fdXU/4LY1/+F2dn/iNrZ/4ra2f+N2tj/kNvY/5Xc2P+Z3tn/n+DZ/6Ph2P+o4tf/q+HU/6/h0f+y4c7/tuHL/7zjyv/C5sr/yunL/9Luzf/Z8s7/3/XP/+P3z//m+M//5/jN/+j4zP/o+Mv/AIEAfv8AZ7y+/2m/wP9uw8X/dMjK/3rNz/9/0dP/g9TW/4bW1/+J1tf/i9bX/43W1v+Q19b/ldjW/5ra1/+f3Nf/pN3X/6je1f+r3dP/r93P/7LdzP+23cr/u97I/8LhyP/J5cn/0OnK/9fty//d8Mz/4fLM/+Pzy//l88r/5fLI/+Xyx/8AgQB+/wBsusD/brzC/3LAxv94xcv/fsrQ/4PO0/+G0Nb/idHX/4rR1v+M0NX/jtDU/5HQ1P+V0tT/mtPU/5/V1f+k19T/qNjT/6zY0P+v183/stfK/7bXx/+72Mb/wdvF/8jexv/P4sf/1ebI/9vpyP/f6sj/4evH/+Lrxv/j6sT/4+rD/wCBAH7/AHO4w/91usX/eb7J/37Czf+DxtL/iMrV/4vL1v+MzNf/jsvW/4/K1P+QytP/k8rS/5bL0v+bzNL/oM7T/6XQ0v+p0dH/rdHO/7DQy/+z0Mj/t9DF/7vRw//B1MP/yNfD/8/bxP/V3sX/2uHF/97jxf/g48T/4ePC/+Liwf/i4sD/AIEAfv8AfLfI/365yv+CvM3/h8DR/4vE1f+Px9j/kcjZ/5LH2P+Txtf/k8XV/5TD0/+Ww9L/msTR/57G0v+jyNL/qMnR/6zK0P+wys7/s8rL/7bKyP+6ysX/vsvD/8TNwv/K0ML/0dTD/9fXxP/c2sT/4NvD/+Lcwv/j3MH/49u//+Pbvv8AgQB+/wCIts//irjQ/4271P+Rv9f/lcLa/5jE3P+axd3/msTc/5rC2v+awNf/m77V/5y+0/+gv9P/pMDT/6nC0/+uxNP/ssXS/7XF0P+5xc3/vMXJ/7/Fx//ExsX/ycjE/8/LxP/WzsT/3NLF/+HUxf/k1sX/59fE/+jWwv/o1sH/6NXA/wCBAH7/AJW31/+XuNj/mrvb/56/3/+hweH/pMPj/6XD4/+lweH/pL/e/6O92/+ju9n/pbrX/6i71/+svNf/sb7X/7bA1/+6wdb/vsLU/8HC0f/Ewc7/yMHL/8zCyf/RxMj/18fI/97LyP/jzsn/6NHJ/+zTyf/u08j/8NPG//DTxf/w0sT/AIEAfv8Ao7ff/6S44f+nu+P/q77m/67A6f+wwur/scHp/7C/5/+vveT/rrrh/6643v+vt93/srjc/7a63P+7vNz/wL7c/8W/2//IwNn/y7/X/86/0//Sv9H/1sDO/9vCzf/hxc3/58nO/+3Mzv/yz8//9tDO//jRzf/60cz/+tHL//rQyv8AgQB+/wCvteb/sbfo/7S66v+3vO3/ur/v/7u/8P+8v+//u73t/7q66v+4t+b/uLXk/7q04v+9teH/wbfi/8a54v/Lu+L/z73i/9O94P/Wvd3/2b3a/9y91//gvtT/5cDT/+vD0//xxtT/98rU//zM1f//ztT//8/T///P0v//z9H//87Q/wCBAH7/ALmx6v+6s+z/vbXu/8C48f/DuvP/xbv0/8W68//EuPH/w7Xu/8Gz6v/Bsej/w7Dm/8ax5v/Ks+b/z7bn/9S45//Zueb/3brl/+C64v/iut7/5rrb/+m62f/uvNj/9L/X//rC2P//xtj//8jZ///K2P//y9j//8vW///L1f//y9T/AIEAfv8Avqrr/7+r7P/Cru//xbDx/8iy9P/Ks/T/yrP0/8mx8f/Iru7/x6zr/8eq6f/Jquj/zKvn/9Gt6P/WsOn/27Lp/+C06f/jtOf/5rTk/+m04P/ss93/77Ta//S22f/5uNj//7vZ//+/2f//wdn//8PZ///E2P//xNf//8TW///E1f8AgQB+/wC+nub/wJ/o/8Oi6//Gpe3/yafw/8uo8f/LqPD/y6bu/8qk6//Joen/yaDm/8ug5f/PoeX/06Tm/9mn5//eqej/4qvn/+as5f/pq+L/66ve/+2q2//xqtj/9azW//qu1f//sdX//7TW//+21v//uNb//7nV//+61P//udP//7nS/wCBAH7/ALqP3v+8kOD/v5Pi/8KW5v/Fmej/x5rp/8ia6f/ImOf/x5bl/8eU4v/Hk+D/yZTg/82V4P/SmOH/15vi/92e4//hn+L/5KDg/+ef3f/pntn/657V/+6d0v/yntD/96DP//yjzv//ps7//6jO//+qzv//q83//6vM//+ry///q8r/AIEAfv8As37T/7SA1f+3g9j/u4bb/76J3v/Bit//wovf/8KJ3v/BiNz/wYba/8KF2P/Ehtj/yIjY/82L2v/Tjtv/2JHb/92S2//gk9j/4pLV/+SR0f/lj8z/6I/J/+uQxv/wkcX/9ZTE//qWxP/+mcT//5rE//+bw///m8L//5vA//+bwP8AgQB+/wCqb8j/rHHK/69zzf+zd9D/tnrT/7l81f+6fNX/unvU/7p60v+6edD/vHjP/755z//Ce9D/yH7R/82B0v/ShNP/14XS/9qG0P/bhcz/3YPH/96Cw//ggb//5IG8/+iDu//shbr/8Ye5//aJuf/5i7n/+4y4//2Mtv/9jLX//Yy1/wCBAH7/AKNjv/+lZMH/qGfE/6xrx/+vbsr/snDM/7Rxzf+0cMz/tG/K/7Ruyf+2bsj/uW/I/71xyf/CdMr/yHfL/816zP/Re8v/1HvI/9Z6xf/XeMD/2He7/9p2t//ddrT/4Xey/+V5sf/qe7D/7n2w//F/r//0gK7/9YCt//WArP/2f6v/AYEAfv8Anly6/6BevP+kYb//qGTC/6tnxf+uasf/sGrI/7Bqx/+wacb/sWjE/7Jow/+1acP/umvE/79uxv/Fcsf/ynTI/852x//QdsT/0nTA/9Nzu//Ucbf/1nCy/9lwr//dca3/4XOs/+V1q//qd6v/7Xiq/+95qf/weaj/8Xmn//F5pv/q1xCeEzY3RgAAAABJRU5ErkJggg==';
  public mainPicLoad = signal<boolean>(false);

  // constructor() {
  //   super();
  // }

  ngAfterViewInit(): void {
    // console.log(this.getName());
    // this.scrollToTop();
  }

  public setMainPicLoad(): void {
    // setTimeout(() => {
      this.mainPicLoad.set(true);
    // }, 2000);
  }

  public helloLoad(): void {
    console.log('helloLoad');
  }

  requiredMethod(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  getName(): string {
    let greeting = super.getName() + ' hello!';
    return greeting;
  }

  private scrollToTop(): void {
    document.getElementById('pageWrap').scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  public openPersonDescModal(persona: IAboutPersonalData): void {
    this.chosenPersonData = persona;
    this.hideScroll();
  }

  public closePersonDescModal(): void {
    this.chosenPersonData = null;
    this.showScroll();
  }
}
