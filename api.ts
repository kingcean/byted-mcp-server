
// 接口为查询实例型负载均衡接口，接口名为DescribeLoadBalancers
type ListenerHealthStatus = 'Active' | 'Error' | 'NoTarget' | 'Disabled'; // 监听器状态，支持：Active（正常）Error（存在异常）NoTarget（无目标）Disabled（未开启）
type LoadBalancerStatus = 'Active' | 'Provisioning' | 'Configuring' | 'Deleting' | 'CreateFailed' | 'Inactive';
type LoadBalancerType = 'private' | 'public';
type LoadBalancerBusinessStatus = 'FinancialLocked' | 'Normal';
type ISPString = 'BGP' | 'ChinaMobile' | 'ChinaUnicom' | 'ChinaTelecom' | 'BGPAntiDDoS';

interface FilterTagType {
	Key: string;
	Values?: string[];
}
interface DescribeLoadBalancersResponse {
	RequestId: string;
	PageNumber: number;
	PageSize: number;
	TotalCount: number;
	LoadBalancers: LoadBalancerInnerDescribed[];
}

interface DescribeLoadBalancers {
	PageSize: number;
	PageNumber: number;
	LoadBalancerIds?: string[];
	VpcId?: string;
	LoadBalancerName?: string;
	ProjectName?: string;
	TagFilters?: Array<FilterTagType>;
	EipAddress?: string;
	EniAddress?: string;
	EnableFuzzySearch?: 'on' | 'off';
}

interface LoadBalancer {
	AddressIpVersion?: 'DualStack' | '';
	LoadBalancerId: string;
	LoadBalancerName: string;
	Status: LoadBalancerStatus; // 负载均衡实例状态。Active：运行中。Provisioning：创建中。Configuring：配置中。Deleting：删除中。CreateFailed：创建失败。;
	Description: string;
	CreateTime: string;
	UpdateTime: string;
	Type: LoadBalancerType;
	VpcId: string;
	SubnetId: string;
	EipId: string;
	EipAddress: string;
	EniId: string;
	DNSName: string;
	EniAddress: string;
	BusinessStatus: LoadBalancerBusinessStatus;
	LockReason: string;
	OverdueTime: string;
	DeletedTime: string;
	LoadBalancerBillingType: 2;
	ProjectName?: string;
	TLSAccessLog?: TLSAccessLog;
	DeleteProtection?: 'on' | 'off';
	AccountId?: string;
	Tags: Array<{ Key: string; Value?: string }>;
	ZoneMappings: ZoneMapping[];
	WafProtectionEnabled?: 'on' | 'off';
	WafInstanceId?: string;
	PrivateDNSName?: string;
	ModificationProtectionReason?: string;
	ModificationProtectionStatus?: 'NonProtection' | 'ConsoleProtection';
	LoadBalancerEdition?: string;
	ProxyProtocolEnabled?: 'on' | 'off';
}
interface TLSAccessLog {
	Enabled: boolean;
	TopicId: string;
	ProjectId: string;
}

interface ZoneMapping {
	ZoneId: string;
	SubnetId: string;
	LoadBalancerAddresses: LoadBalancerAddresse[];
	IsMaster?: boolean;
}

interface LoadBalancerInnerDescribed extends LoadBalancer {
	Listeners?: LoadBalancerInnerDescribedListener[];
	UnhealthyListenersCount: number;
}

interface LoadBalancerInnerDescribedListener {
	ListenerId: string;
	ListenerName: string;
	Status: ListenerHealthStatus;
	Port: number;
	Protocol: string;
}

interface LoadBalancerAddresse {
	EniAddress: string;
	EniId: string;
	EipAddress: string;
	EipId: string;
	Eip: Eip;
	EniIpv6Address: string;
	Ipv6EipId: string;
	Ipv6Eip: Ipv6Eip;
}

interface Eip {
	ISP: ISPString; // 公网负载均衡实例的公网IP线路类型。取值如下：BGP：BGP多线（默认值）。
	EipBillingType: 2 | 3; // 公网IP的计费方式。取值如下：2：按量计费-按带宽上限计费（默认值）。3：按量计费-按实际流量计费。
	Bandwidth: number;
	EipAddress: string;
	EipType?: '' | 'anycast';
	PopLocations: PopLocation[];
	AssociationMode: 'Default' | 'Normal';
}

interface Ipv6Eip {
	ISP?: ISPString; // 公网负载均衡实例的公网IP线路类型。取值如下：BGP：BGP多线（默认值）。
	EipBillingType?: 2 | 3; // 公网IP的计费方式。取值如下：2：按量计费-按带宽上限计费（默认值）。3：按量计费-按实际流量计费。
	Bandwidth?: number;
}

interface PopLocation {
	PopId: string;
	PopName: string;
}
